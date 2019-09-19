const { MongoClient } = require('mongodb');

class Mongo {

    constructor(config) {
        this.config = config;
        this._client = null;
    }

    async connect() {
        let _this = this;
        return new Promise((resolve, reject) => {
            MongoClient.connect(_this._url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) return reject(err);
                _this._client = client;
                resolve();
            });
        })
    }

    get client() {
        if (!this._client) throw { message: 'Conexão não iniciada' };
        return this._client;
    }

    get _url() {
        return this.config.connectionString || `mongodb://${this.config.user}:${this.config.password.replace(/@/g, '%40')}@${this.config.server}:${this.config.port}`;
    }
}

module.exports = Mongo;