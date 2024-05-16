import * as plexApi from '~/lib/plex/api';
import * as sessionModel from '~/lib/session';

import * as router from '@solidjs/router';
import type { APIEvent } from "@solidjs/start/server";

export async function GET({ params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    try {
        const user = await sessionModel.getUser(sessionId);
        const token = user?.plex_token!;

        const ids = [params.metaID, params.id];
        return await plexApi.art(token, ids);
    } catch (e) {
       return router.json({ error: e }); 
    }
}
