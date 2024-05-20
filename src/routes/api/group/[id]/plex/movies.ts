import * as plexApi from '~/lib/plex/api';
import * as sessionModel from '~/lib/session';

import { json } from '@solidjs/router';
import type { APIEvent } from "@solidjs/start/server";

export async function GET({ locals }: APIEvent) {
    const sessionId = locals.session.id;
    try {
        const user = await sessionModel.getUser(sessionId);
        const token = user?.plex_token!;
        const movies = await plexApi.movies(token);
      
        let choices = [];
        for(let i = 0; i < 25; i ++) {
            choices.push(Math.floor(Math.random() * movies.length));
        }
        choices = choices.map((idx) => movies[idx]);

        return json({ error: false, movies: choices });
    } catch (e) {
       return json({ error: e }); 
    }
}
