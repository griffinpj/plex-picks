import { getRequestEvent } from 'solid-js/web';
import RedisController from '~/lib/redis';

export async function getGroup (id: string) : Promise<string> {
    'use server';
    return RedisController.get(id);
}

export async function getSession () : Promise<string> {
    'use server';
    const req = getRequestEvent();
    return req?.locals.session.id;
}

export async function getAlias (session: string) : Promise<string> {
    'use server';
    return RedisController.get(`session-${session}`);
}
