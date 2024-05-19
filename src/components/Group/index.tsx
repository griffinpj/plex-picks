import { Title } from "@solidjs/meta";
import GroupUsers from '~/components/GroupUsers';
import Movies from '~/components/Movies';
import type { Group } from '~/types/group';
import Genres from "~/components/Movies/genres";
import * as serverUtils from '~/lib/utils/server';
import { createStore } from "solid-js/store";
import { Show, createMemo, createResource } from "solid-js";

export default function Group(props: any) {
    const [ genreFilter, setGenreFilter ] = createStore([]);

    const [ group, { mutate, refetch: refetchGroup } ] = createResource(() => props.link, serverUtils.getGroup, {
        initialValue: { owner: '', users: [] },
        deferStream: true
    });
    
    const [ session ]  = createResource(serverUtils.getSession, { 
        initialValue: '',
        deferStream: true 
    });
    const [ aliases ] = createResource(group, serverUtils.getAliases);

    const aliasedGroup = createMemo(() => ({
        owner: aliases()?.get(group()?.owner!),
        users: group()?.users.map((session: string) => aliases()?.get(session))
    }));
    

    /* Poll for group changes */
    setInterval(async () => { 
        const newGroup = await serverUtils.getGroup(props.link);
        mutate(newGroup);
        // refetchGroup();
    }, 3000);

    const isOwner = createMemo(() => group().owner && session() && group().owner === session());

    return (
        <div>
            <Title>Plex Picks</Title>
            <Movies genreFilter={genreFilter}/>
            <Show when={isOwner()}>
                <Genres genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
            </Show>
            <h2 class="text-white">Join with: {props.link}</h2>
            <Show when={isOwner()}>
                <button class="button red">Start Picking</button>
            </Show>
            <GroupUsers group={aliasedGroup()}/>
        </div>
    );
}
