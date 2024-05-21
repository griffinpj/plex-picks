import { Show, createSignal } from 'solid-js';

import * as utils from '~/lib/utils';
import * as serverUtils from '~/lib/utils/server';
import * as request from '~/lib/utils/request';
import SessionAlias from '~/components/SessionAlias';
import "./InitGroup.css";

export default function InitGroup (props: any) {
    const [ joinCode, setCode ] = createSignal('');
    const createGroupHandler = async () => {
        const data = await request.post('/api/group/new', {});
        utils.navigateTo(`/group/${data.link}`);
    };

    const joinGroupHandler = async (linkId: string) => {
        await serverUtils.addToGroup(linkId);
        utils.navigateTo(`/group/${linkId}`);
    };

    return (
        <div class="init-group-container">
            <div class="flex column center">
                <Show when={props.isAuthenticated()} fallback={
                    <div class="flex row">
                        <input 
                        type="text"
                        id="j-join-group" 
                        class="blue input-button"
                        placeholder="Enter Group Code"
                        onChange={(e) => { setCode(e.target.value); }}
                        />
                        <button
                        id="j-create-group" 
                        class="blue input-button narrow"
                        onClick={ () => joinGroupHandler(joinCode()) }
                        >Join Group</button>
                    </div>
                }>
                    <button
                    id="j-create-group" 
                    class="red m-top-16"
                    onClick={ createGroupHandler }
                    >Create Group</button>
                    <span class="flex m-top-32 m-left-32 m-right-32 text-white">or</span>
                    <div class="flex row m-top-16">
                        <input 
                        type="text"
                        id="j-join-group" 
                        class="blue input-button"
                        placeholder="Enter Group Code"
                        onChange={(e) => { setCode(e.target.value); }}
                        />
                        <button
                        id="j-create-group" 
                        class="blue input-button narrow"
                        onClick={ () => joinGroupHandler(joinCode()) }
                        >Join Group</button>
                    </div>
                </Show>
            </div>
        </div>
    );
}
