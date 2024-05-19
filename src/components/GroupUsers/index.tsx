import * as serverUtils from '~/lib/utils/server';
import { useParams } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, Show, Suspense } from "solid-js";
import "./GroupUsers.css";
import { createStore } from 'solid-js/store';

export default function GroupUsers (props: any) {
    return (
        <div class="group-users-container m-top-16">
            <Suspense fallback={<div> Loading Owner</div>}>
                <Show when={props.group}>
                    <h3>
                        Created By: 
                        {props.group.owner}
                    </h3>
                    <ul>
                        <Suspense >
                            <Show when={props.group}>
                                <For each={props.group.users}>{(user) =>
                                    <li> { user as string } </li>
                                }</For>
                            </Show>
                        </Suspense>
                    </ul>
                </Show>
            </Suspense>
        </div>
    );
}
