import RedisController from '~/lib/redis';
import * as sessionModel from '~/lib/session';
import type { Group } from '~/types/group';
import type { Movie } from '~/types/plex';

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

export const advanceStage = async (linkId: string): Promise<Group> => {
    'use server';
    const group = await getGroup(linkId); 
    let stage: string;
    switch (group.stage) {
        case 'join':
            stage = 'in-progress';
            break;
        case 'in-progress':
            stage = 'results';
            break;
        default:
            stage = 'join';
            
    };

    const newGroup = {
        ...group,
        stage
    } as Group;
    await setGroup(linkId, newGroup);

    return new Promise((resolve) => resolve(newGroup));
};


export const addUser = async (linkId: string, sessionId: string): Promise<void> => {
    'use server';
    const group = await getGroup(linkId) as Group;

    if (!group.users.includes(sessionId)) {
        group.users = [...(group.users), sessionId];
    }

    return setGroup(linkId, group);
};

export const getGroupAliases = async (group: Group) : Promise<Map<string, string>> => {
    'use server';
    const aliasMap: Map<string, string> = new Map();

    if (group.users) {
        for (let i = 0; i < group.users.length; i ++) {
            const alias = await sessionModel.getAlias(group.users[i])
            aliasMap.set(group.users[i], alias);
        }
    } 
    
    return new Promise((resolve) => resolve(aliasMap));
};

export const getAliasedGroup = async (id: string) : Promise<Group> => {
    'use server';
    const redis = await RedisController();
    let group = { ...(await redis.get(id)) };

    if (group.owner && group.users) {
        group.owner = await sessionModel.getAlias(group.owner);
        group.users = await Promise.all(
            group.users.map((session: string) => 
                sessionModel.getAlias(session)
            )
        );
    } 
    
    return new Promise((resolve) => resolve(group));
};



