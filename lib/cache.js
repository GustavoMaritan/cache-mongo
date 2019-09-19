const manager = require('./cacheManager');

class Cache {

    constructor(name) {
        this.name = name;
    }

    async get(action, ...params) {
        return await manager.lock(this.name, async () => {
            if (await manager.exist(this.name)) {
                let col = await manager.get(this.name);
                if (col) return await col.find({}).toArray();
            }

            let result = await action(...params);
            await manager.create(this.name, result);
            return result;
        });
    }

    async dropCache(action, params) {
        return await manager.lock(this.name, async () => {
            let result = null;

            if (action) result = await action(...params);

            if (await manager.exist(this.name)) {
                await manager.drop(this.name);
            }

            return result;
        });
    }

    async post(action, ...params) {
        return await this.dropCache(action, params);
    }

    async put(action, ...params) {
        return await this.dropCache(action, params);
    }

    async delete(action, ...params) {
        return await this.dropCache(action, params);
    }
}

module.exports = Cache;