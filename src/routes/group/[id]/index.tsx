import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import * as serverUtils from '~/lib/utils/server';
import GroupUsers from '~/components/GroupUsers';
import './group.css';
import { createEffect, createResource, createSignal } from "solid-js";
import type { Group } from '~/types/group';

export default function Group() {
    const params = useParams();
    const [linkId] = createSignal(params.id);
    const [group, { refetch }] = createResource(linkId, serverUtils.getGroup);

    /* Poll for group changes */
    setInterval(() => { 
        refetch();
    }, 3000);

    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <h2 class="text-white">Join with: {linkId()}</h2>
        <GroupUsers group={group()} />
        </main>
    );
}
