import { Title } from "@solidjs/meta";
import GroupUsers from '~/components/GroupUsers';
import Movies from '~/components/Movies';
import type { Group } from '~/types/group';
import * as serverUtils from '~/lib/utils/server';
import { createStore } from "solid-js/store";
import { Match, Show, Suspense, Switch, createEffect, createMemo, createResource, createSignal } from "solid-js";

export default function Group(props: any) {
    const [ stageTransition, setStageTransition ] = createSignal(false);
    const [ genreFilter, setGenreFilter ] = createStore([]);
    const [ session ]  = createResource(serverUtils.getSession);
    const [ userPicks, { mutate: setUserPicks }] = createResource(async () => {
        const user = await serverUtils.getUser();
        return user.picks;
    });

    const getMappedGroup = async (group: Group | void) => {
        
        const newGroup = group ? group : await serverUtils.getGroup(props.link);
        const aliases = await serverUtils.getAliases(newGroup);

        return {
            owner: { alias: aliases.get(newGroup.owner), value: newGroup.owner },
            users: newGroup.users.map((user: string) => ({
                alias: aliases.get(user),
                value: user
            })),
            stage: newGroup.stage,
            selection: newGroup.selection
        };
    };

    const [ group, { mutate }] = createResource(async () => await getMappedGroup());

    /* Poll for group changes */
    createEffect(() => {
        if (group()?.stage !== 'in-progress') {
            setInterval(async () => mutate(await getMappedGroup()), 3000);
        }
    });

    const handleStartPicking = async () => {
        setStageTransition(true);
        const group = await serverUtils.advanceStage(props.link);
        mutate(await getMappedGroup(group))
        setStageTransition(false);
    };

    const [ isOwner ] = createSignal(group()?.owner.value && session() && group()?.owner.value === session());
    return (
        <Show when={!group.loading} fallback={<div class="text-white"> Loading group ... </div>}>
            <Title>Plex Picks</Title>
            <Switch>
                <Match when={group()?.stage === 'join'}>
                    <Show when={!stageTransition()} fallback={
                        <div class="text-white"> Loading movie selection ... </div>
                    }>
                        <h2 class="text-white">Join with: {props.link}</h2>
                        <Suspense>
                            <Show when={isOwner()}>
                                <button class="button red" onClick={handleStartPicking}>Start Picking</button>
                            </Show>
                            <GroupUsers group={group} />
                        </Suspense>
                    </Show>
                </Match>
                <Match when={group()?.stage === 'in-progress'}>
                    <Show when={group()?.selection && userPicks()}>
                        <Movies 
                            setUserPicks={setUserPicks} 
                            userPicks={userPicks()} 
                            movies={group()!.selection} 
                            genreFilter={genreFilter}/>
                    </Show> 
                </Match>
            </Switch>
        </Show>
    );
}
