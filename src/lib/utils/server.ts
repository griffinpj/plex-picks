import { getRequestEvent } from 'solid-js/web';
import * as groupModel from '~/lib/group';
import * as sessionModel from '~/lib/session';
import type { Group } from '~/types/group';
import type { User } from '~/types/user';

export async function getSession () : Promise<string> {
    'use server';
    const req = getRequestEvent();
    return req?.locals.session.id;
}

export async function addToGroup (linkId: string) : Promise<void> {
    'use server';
    const req = getRequestEvent();
    const sessionId = await req?.locals.session.id;

    return groupModel.addUser(linkId, sessionId);
}

export async function getGroup (id: string) : Promise<Group> {
    'use server';
    return groupModel.getAliasedGroup(id);
}

export async function getUser () : Promise<User> {
    'use server';
    const sessionId = await getSession();
    return sessionModel.getUser(sessionId);
}

export async function setAlias (session: string, alias: string) : Promise<void> {
    'use server';
    return sessionModel.setAlias(session, alias);
}

export async function getAlias (session: string) : Promise<string> {
    'use server';
    const alias = await sessionModel.getAlias(session);
    if (!alias) {
        const newUser = await sessionModel.createUser(session);
        return new Promise((resolve) => resolve(newUser?.alias))
    }

    return new Promise((resolve) => resolve(alias));
}

export async function setPlexToken (token: string) : Promise<void> {
    'use server';
    const sessionId = await getSession();

    return sessionModel.setPlexToken(sessionId, token);
}

export async function setPlexPin (pin: number) : Promise<void> {
    'use server';
    const sessionId = await getSession();

    return sessionModel.setPlexPin(sessionId, pin);
}

