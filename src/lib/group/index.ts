import RedisController from '~/lib/redis';
import type { Group } from '~/types/group';

export const getGroup = async (id: string): Promise<Group> => {
    'use server';
    const redis = await RedisController();
    const group = { ...(await redis.get(id)) } as Group;
    return new Promise((resolve) => resolve(group));
};

export const setGroup = async (linkId: string, group: Group): Promise<void> => {
    'use server';
    const redis = await RedisController();
    return redis.set(linkId, group);
};

export const getAlias = async (session: string) : Promise<string> => {
    'use server';
    const redis = await RedisController();
    return redis.get(`session-${session}`, false);
};

export const getAliasedGroup = async (id: string) : Promise<Group> => {
    'use server';
    const redis = await RedisController();
    let group = { ...(await redis.get(id)) };

    if (group.owner && group.users) {
        group.owner = await redis.get(`session-${group.owner}`, false);
        group.users = await Promise.all(
            group.users.map((session: String) => 
                redis.get(`session-${session}`, false)
            )
        );
    } 
    
    return new Promise((resolve) => resolve(group));
};



