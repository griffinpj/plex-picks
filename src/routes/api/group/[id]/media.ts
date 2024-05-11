import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';

export async function GET({ params, locals }: APIEvent) {
    // TODO should get movie information for groups
    const sessionId = locals.session.id;
    
    return json({ error: false, group: params.id });
};
