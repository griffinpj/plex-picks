import Redis from '~/models/redis';

class RedisController {
    store: Map <string, any>;

    constructor () {
        this.store = Redis(); 
    }

    async get (key: string) : Promise <any> {
        const val = this.store.get(key);
        return new Promise((resolve) => {
            resolve(val); 
        });
    }

    async set (key: string, value: any) : Promise <void> {
        this.store.set(key, value);
        return new Promise((resolve) => resolve());
    }
}


const redisController = new RedisController;
export default redisController;
