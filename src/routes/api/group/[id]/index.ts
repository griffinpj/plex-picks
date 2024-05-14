import type { APIEvent } from "@solidjs/start/server";
import { json } from '@solidjs/router';
import redisController from "~/lib/redis";

export async function GET({ params, locals }: APIEvent) {
    const linkId = params.id;
    let group = { ...(await redisController.get(linkId)) };

    if (group.owner) {
        group.owner = await redisController.get(`session-${group.owner}`);
    }

    if (group.users) {
        group.users = await Promise.all(
            group.users.map((user: string) => 
                redisController.get(`session-${user}`)
            )
        );
    }

    return json({ error: false, group });
};
