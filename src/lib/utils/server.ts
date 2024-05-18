import { getRequestEvent } from 'solid-js/web';
import * as groupModel from '~/lib/group';
import * as sessionModel from '~/lib/session';
import { checkForAuthToken } from '~/lib/plex';
import * as plexApi from '~/lib/plex/api';

import type { Group } from '~/types/group';
import type { User } from '~/types/user';
import type { Movie } from '~/types/plex';

export async function getSession () : Promise<string> {
    'use server';
    const req = getRequestEvent();
    return req?.locals.session.id;
}

export async function getGenres () : Promise<string[]> {
    'use server';
    const sessionId = await getSession();
    const user = await sessionModel.getUser(sessionId);
    const token = user?.plex_token!;
    const movies = await plexApi.movies(token);

    let genres = Array.from((new Set(movies
        .reduce((acc: string [], movie : Movie) => ([
            ...acc,
            ...(movie.genre)
        ]), []))).values());

    return new Promise(resolve => resolve(genres));
}

export async function getMoviesSample (options: { size: number, genres: string []}) : Promise<Movie []> {
    'use server';
    const sessionId = await getSession();
    const user = await sessionModel.getUser(sessionId);
    const token = user?.plex_token!;
    let movies = await plexApi.movies(token);

    if (options.genres && options.genres.length) {
        movies = movies.filter((movie: Movie) => movie.genre.some(g => options.genres.includes(g))); 
    }

    // let seen = new Set();
    // movies = movies.filter((movie: Movie) => {
    //     const title = movie.title.trim().toUpperCase();
    //     const hasSeen = seen.has(title);
    //     seen.add(title);
    //     return !hasSeen;
    // });

    let sample : Movie [];
    let choices : number [] = [];
    for (let i = 0; i < (options.size < movies.length ? options.size: movies.length); i ++) {
        choices.push(Math.floor(Math.random() * movies.length));
    }

    sample = choices.map((idx) => movies[idx]);
    return new Promise(resolve => resolve(sample));
}

export async function checkForPlexAuth () : Promise<boolean> {
    'use server';
    const user = await getUser();
    let hasToken = !!user?.plex_token;
    try {
        if ((user?.plex_pin && !user?.plex_token)) {
            const authToken = await checkForAuthToken(user.plex_pin);
            hasToken = !!authToken;
            if (authToken) {
                await setPlexToken(authToken);
            }
        }
    } catch (e) {
        await setPlexPin(null);
        return new Promise(resolve => resolve(false));
    }

    return new Promise(resolve => resolve(hasToken));
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

export async function setPlexPin (pin: number | null) : Promise<void> {
    'use server';
    const sessionId = await getSession();

    return sessionModel.setPlexPin(sessionId, pin);
}

