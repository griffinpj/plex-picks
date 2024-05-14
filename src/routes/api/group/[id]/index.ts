import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';
import * as groupModel from '~/lib/group';

export async function GET({ params, locals }: APIEvent) {
    let group = await groupModel.getAliasedGroup(params.id);
    return json({ error: false, group });
};
