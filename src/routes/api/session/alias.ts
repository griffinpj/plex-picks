import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';
import * as sessionController from '~/lib/session';

export async function POST({ request, params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const { alias } = await request.json();
    await sessionController.setAlias(sessionId, alias);
    
    return json({ error: false, alias });
};
