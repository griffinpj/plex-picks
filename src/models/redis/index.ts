import { createClient } from 'redis';


export default async function () : any {
    'use server';
    const client = await createClient({
        url: process.env.REDIS_URL
    })
        .on('error', (err: any) => console.log('Redis Client Error', err))
        .connect();

    return client;
}
