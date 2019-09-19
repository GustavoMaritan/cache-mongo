# PACKAGE-CACHE

* Controle de caches, usando mongo db.


#### Config APP cache.
```js

    const CacheManager = require('package-cache');

    (async ()=>{
        await CacheManager.init({
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
    })();

```

#### Controller USE cache.

```js

    const Cache = require('package-cache');
    const cache = new Cache('CacheName');

    app.get('/api/usuario', async(req, res)=>{
        let result = await cache.get(getUsuarios);
        res.status(200).json(result);
    });

    async function getUsuarios(){
        // Retorna dados usuarios
    }

```
