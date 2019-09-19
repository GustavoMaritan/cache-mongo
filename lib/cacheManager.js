const Mongo = require('./mongo');

class CacheManager {

    static init(config, database) {
        this.config = config;
        this.database = database || config.database;
        this.cacheLocked = config.cacheLocked || 'CachesLocked';
    }

    static async connect() {
        if (!this.mongo)
            this.mongo = new Mongo(this.config);
        if (!this.mongo._client || !this.mongo._client.isConnected())
            await this.mongo.connect();
    }

    static async close() {
        await this.mongo.client.close();
    }

    static async create(name, data) {
        await this.connect();
        let col = await this.mongo.client.db(this.database).createCollection(name);
        if (!data) return;
        await col.insertMany(data);
    }

    static async get(name) {
        await this.connect();
        return this.mongo.client.db(this.database).collection(name);
    }

    static async exist(name) {
        await this.connect();
        let col = await this.mongo.client.db(this.database).listCollections({ name: name }).toArray();
        return !!col.length;
    }

    static async drop(name) {
        await this.connect();
        if (await this.exist(name))
            await this.mongo.client.db(this.database).collection(name).drop();
    }

    static async lock(name, action) {
        await this.connect();
        if (!await this.exist(this.cacheLocked))
            await this.create(this.cacheLocked)

        let col = await this.mongo.client.db(this.database).collection(this.cacheLocked);
        let timeout = 0;
        while (!!await col.findOne({ Name: name }) && timeout < 3000) {
            await this.sleep();
            timeout += 200;
        }
        await col.insertOne({ Name: name });
        let result = await action(name);
        await col.deleteMany({ Name: name });
        return result;
    }

    static async sleep(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time || 200);
        });
    }
}

module.exports = CacheManager;