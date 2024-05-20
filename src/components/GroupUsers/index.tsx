import * as serverUtils from '~/lib/utils/server';
import { useParams } from "@solidjs/router";
import { createMemo, createResource, createSignal, For, Show, Suspense } from "solid-js";
import "./GroupUsers.css";
import { createStore } from 'solid-js/store';

export default function GroupUsers (props: any) {
    return (
        <div class="group-users-container m-top-16">
            <Suspense fallback={<div> Loading Owner</div>}>
                <h3> Created By: { props.group()?.owner.alias } </h3>
                <ul>
                    <Suspense >
                        <For each={props.group().users}>{(user) =>
                            <li> { (user.alias ? user.alias : user.value) as string } </li>
                        }</For>
                    </Suspense>
                </ul>
            </Suspense>
        </div>
    );
}
