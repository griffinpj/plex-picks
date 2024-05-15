import { getRequestEvent } from 'solid-js/web';
import * as groupModel from '~/lib/group';
import * as sessionModel from '~/lib/session';
import type { Group } from '~/types/group';

export async function addToGroup (linkId: string) : Promise<void> {
    'use server';
    const req = getRequestEvent();
    const sessionId = await req?.locals.session.id;

    const group = await groupModel.getGroup(linkId);
    if (!group.users.includes(sessionId)) {
        group.users = [...group.users, sessionId];
    }

    return groupModel.setGroup(linkId, group);
}

export async function getGroup (id: string) : Promise<Group> {
    'use server';
    return groupModel.getAliasedGroup(id);
}

export async function getSession () : Promise<string> {
    'use server';
    const req = getRequestEvent();
    return req?.locals.session.id;
}

export async function getAlias (session: string) : Promise<string> {
    'use server';

    return groupModel.getAlias(session);
}

export async function setAlias (session: string, alias: string) : Promise<void> {
    'use server';
    return sessionModel.setAlias(session, alias);
}
