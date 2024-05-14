import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';
import * as groupModel from '~/lib/group';

export async function GET({ params, locals }: APIEvent) {
    const linkId = params.id;
    const sessionId = locals.session.id;

    let group = await groupModel.getGroup(linkId);;
    // if (group.users) { group.users.push(sessionId); }

    console.log('setting group');

    // await groupModel.setGroup(linkId, group);

    return json({ error: false, link: linkId });
};
