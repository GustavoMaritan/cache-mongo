declare namespace cacheConfig {

    type CacheManagerConfig = {
        connectionString: String;
        user: String;
        password: String;
        server: String;
        port: String;
        database: String;
        auth: String;
        cacheLocked?: 'CachesLocked';
    }

    interface CacheFunctions {
        get(action: Function, ...params: any): Promise<any>;
        post(action: Function, ...params: any): Promise<any>;
        put(action: Function, ...params: any): Promise<any>;
        delete(action: Function, ...params: any): Promise<any>;
    }

    interface CacheManager {
        init(config: CacheManagerConfig, database?: String): void;
    }

    interface Cache {
        new(name: String): CacheFunctions
    }

    interface CacheConfig {
        CacheManager: CacheManager;
        Cache: Cache
    }
}

declare var cacheConfig: cacheConfig.CacheConfig;
export = cacheConfig;
