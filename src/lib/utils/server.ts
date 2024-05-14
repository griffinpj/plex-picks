import { getRequestEvent } from 'solid-js/web';
import RedisController from '~/lib/redis';
import type { Group } from '~/types/group';

export async function getGroup (id: string) : Promise<Group> {
    'use server';
    let group = RedisController.get(id);
    if (group.users) {
        group.users = await Promise.all(
            group.users.map((session: String) => 
                RedisController.get(`session-${session}`)
            )
        );
    }

    console.log(group);

    return new Promise((resolve) => resolve(group));
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
