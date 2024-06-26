import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';

import * as utils from '~/lib/utils';
import * as groupModel from '~/lib/group';
import type { Group } from '~/types/group';

export async function POST({ params, locals }: APIEvent) {
    const sessionId = locals.session.id;
    const linkId = utils.generateCode(5);

    const group = {
        owner: sessionId,
        users: [sessionId],
        stage: 'join',
        selection: []
    } as Group;
    await groupModel.setGroup(linkId, group);

    return json({ error: false, link: linkId });
};
