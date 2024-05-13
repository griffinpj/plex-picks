import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';

import * as utils from '~/lib/utils';
import RedisController from "~/lib/redis";

export async function GET({ request, params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const alias = await RedisController.get(`session-${sessionId}`);
    return json({ error: false, alias });
};

export async function POST({ request, params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const { alias } = await request.json();
    const error = await RedisController.set(`session-${sessionId}`, alias);
    
    return json({ error: false, alias });
};
