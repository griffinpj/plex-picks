import { RedisClientType } from 'redis';
import Redis from '~/models/redis';

class RedisController {
    store: any;

    constructor (store : RedisClientType) {
        this.store = store; 
    }

    async get (key: string, parse: boolean = true) : Promise <any> {
        try {
            const val = await this.store.get(key);
            const parsedVal = parse ? JSON.parse(val) : val; 
            return new Promise((resolve) => resolve(parsedVal));;
        } catch (e: Error) {
            return new Promise((resolve) => resolve(new Error('Could not get key ' + key)));
        }
    }

    async set (key: string, value: any, stringify: boolean = true) : Promise <void> {
        try {
            const encodedVal = stringify ? JSON.stringify(value) : value; 
            return this.store.set(key, encodedVal);
        } catch (e: Error) {
            return new Promise((resolve) => resolve(new Error('Could set data for key ' + key)));
        }

    }
}

let redisController = null;
export default async () : Promise<RedisController> => {
    if (!redisController) {
        const redisClient = await Redis();
        redisController = new RedisController(redisClient);  
    } 

    return new Promise((resolve) => resolve(redisController));;
};
