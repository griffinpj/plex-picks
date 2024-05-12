import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';

import RedisController from "~/lib/redis";

export async function POST({ params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const linkId = params?.id;

    console.log(params);
    RedisController.set(linkId, 
    
    
    return json({ error: false, id: sessionId });
};
