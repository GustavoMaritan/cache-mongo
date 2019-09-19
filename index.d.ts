declare namespace cacheConfig {

    type CacheManagerConfig = {
        user: String;
        password: String;
        server: String;
        port: String;
        database: String;
        auth: String;
        cacheLocked?: 'CachesLocked';
    }

    class CacheManager {
        static init(config: CacheManagerConfig, database?: String): void;
    }

    class Cache {
        constructor(name: String): void;

        get(action: Function, ...params: Any): Promise<Any>;
        post(action: Function, ...params: Any): Promise<Any>;
        put(action: Function, ...params: Any): Promise<Any>;
        delete(action: Function, ...params: Any): Promise<Any>;
        dropCache(): Promise<void>;
    }

    interface CacheConfig {
        CacheManager: CacheManager;
        Cache: Cache
    }
}

declare var cacheConfig: cacheConfig.CacheConfig;
export = cacheConfig;
