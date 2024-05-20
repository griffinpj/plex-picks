import { Title } from "@solidjs/meta";
import GroupUsers from '~/components/GroupUsers';
import Movies from '~/components/Movies';
import type { Group } from '~/types/group';
import Genres from "~/components/Movies/genres";
import * as serverUtils from '~/lib/utils/server';
import { createStore } from "solid-js/store";
import { Show, Suspense, createMemo, createResource } from "solid-js";
import { createAsync, createAsyncStore } from "@solidjs/router";

export default function Group(props: any) {
    const [ genreFilter, setGenreFilter ] = createStore([]);
    const [ session ]  = createResource(serverUtils.getSession);

    const [ group, { mutate, refetch }] = createResource(async () => { 
        const group = await serverUtils.getGroup(props.link);
        const aliases = await serverUtils.getAliases(group);

        return {
            owner: { alias: aliases.get(group.owner), value: group.owner },
            users: group.users.map((user: string) => ({
                alias: aliases.get(user),
                value: user
            }))
        };
    });
    

    /* Poll for group changes */
    setInterval(async () => { 
        const newGroup = await serverUtils.getGroup(props.link);
        const aliases = await serverUtils.getAliases(newGroup);

        const mappedGroup = {
            owner: { alias: aliases.get(newGroup.owner), value: newGroup.owner },
            users: newGroup.users.map((user: string) => ({
                alias: aliases.get(user),
                value: user
            }))
        };
        mutate(mappedGroup);
        // refetch(); // retriggers re render of elements... UI blinks...
    }, 3000);

    const isOwner = () => group()?.owner.value && session() && group()?.owner.value === session();

    // <Show when={isOwner()}>
    //     <Genres genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
    // </Show>
    return (
        <div>
            <Title>Plex Picks</Title>
           <Movies genreFilter={genreFilter}/>
            <h2 class="text-white">Join with: {props.link}</h2>
            <Suspense>
                <Show when={isOwner()}>
                    <button class="button red">Start Picking</button>
                </Show>
                <Show when={group()}>
                    <GroupUsers group={group} />
                </Show>
            </Suspense>
        </div>
    );
}
