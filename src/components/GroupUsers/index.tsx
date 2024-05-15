import * as serverUtils from '~/lib/utils/server';
import { useParams } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, Show, Suspense } from "solid-js";
import "./GroupUsers.css";
import { createStore } from 'solid-js/store';

export default function InitGroup() {
    const params = useParams();
    const [group, { mutate }] = createResource(() => params.id, serverUtils.getGroup, {
        initialValue: { owner: '', users: [] },
        deferStream: true
    });

    const owner = () => (group()?.owner);
    const users = () => (group()?.users);

    /* Poll for group changes */
    setInterval(async () => { 
        const newGroup = await serverUtils.getGroup(params.id);
        mutate(newGroup);
    }, 3000);

    return (
        <div class="group-users-container">
            <button class="button red">Start Picking</button>
            <Suspense fallback={<div> Loading Owner</div>}>
                <Show when={owner()}>
                    <h3>
                        Created By: 
                        {owner()}
                    </h3>
                    <ul>
                        <Suspense >
                            <Show when={users()}>
                                <For each={users()}>{(user, i) =>
                                    <li> { user } </li>
                                }</For>
                            </Show>
                        </Suspense>
                    </ul>
                </Show>
            </Suspense>
        </div>
    );
}
