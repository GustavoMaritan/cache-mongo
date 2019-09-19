# PACKAGE-CACHE

* Controle de caches, usando mongo db.

#### Config APP cache.
```js

    const { CacheManager } = require('cache-mongo');

    CacheManager.init({
        // --------------------------
        connectionString: 'mongodb://...',
        // OR
        user: 'user',
        password: 'password',
        server: 'ipServer',
        port: 'port',
        database: 'database',
        // --------------------------
        auth: 'auth',
        cacheLocked?: 'CachesLocked'
    }, 'Cache');

```

#### Controller USE cache.

```js
    const { Cache } = require('cache-mongo');
    const cache = new Cache('CacheName');

    const repository = {
        get: ()=> { },
        post: (body)=> { },
        post: (id, body)=> { },
        remove: (id)=> { }
    };

    app.get('/api', async (req, res) => {
        /* Busca todos dados para armazenamento do cache */ 
        /* Cria cache sempre que ele não existir */
        let result = await cache.get(repository.get);
        res.status(200).json(result);
    });

    app.post('/api', async (req, res) => {
        /* Insere registro e dropa cache para atualização ao próximo get */
        let result = await cache.post(repository.post, req.body);
        res.status(200).end();
    });

    app.put('/api/:id', async (req, res) => {
        /* Insere registro e dropa cache para atualização ao próximo get */
        let result = await cache.put(repository.put, req.params.id, req.body);
        res.status(200).end();
    });

    app.delete('/api/:id', async (req, res) => {
        /* Insere registro e dropa cache para atualização ao próximo get */
        let result = await cache.delete(repository.remove, req.params.id);
        res.status(200).end();
    });

```
