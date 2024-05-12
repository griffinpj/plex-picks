import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';

import * as utils from '~/lib/utils';
import RedisController from "~/lib/redis";

export async function POST({ params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const linkId = utils.generateCode(5);

    await RedisController.set(linkId, {
        owner: sessionId,
        users: [ sessionId ]
    });
    
    return json({ error: false, link: linkId });
};
