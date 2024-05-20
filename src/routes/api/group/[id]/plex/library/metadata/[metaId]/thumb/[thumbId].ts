import * as plexApi from '~/lib/plex/api';
import * as sessionModel from '~/lib/session';
import * as groupModel from '~/lib/group';

import * as router from '@solidjs/router';
import type { APIEvent } from "@solidjs/start/server";

export async function GET({ params }: APIEvent) {
    const groupId = params.id;
    try {
        const group = await groupModel.getGroup(groupId);
        const user = await sessionModel.getUser(group.owner);
        const token = user?.plex_token!;

        const ids = [params.metaId, params.thumbId];
        return await plexApi.thumb(token, ids);
    } catch (e) {
       return router.json({ error: e }); 
    }
}
