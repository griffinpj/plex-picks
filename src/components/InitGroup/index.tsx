import { createSignal } from 'solid-js';

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
            <SessionAlias alias={props.alias} setAlias={props.setAlias} />
            <h3 class="text-white"> Name: {props.alias} </h3>
            <button
                id="j-create-group" 
                class="red"
                onClick={ createGroupHandler }
            >Create Group</button>
            <label for="j-join-group">
                Join Group
                <input 
                    type="text"
                    id="j-join-group" 
                    placeholder="Enter Group Code"
                    onChange={(e) => { setCode(e.target.value); }}
                />
                <button
                    id="j-create-group" 
                    class="blue"
                    onClick={ () => joinGroupHandler(joinCode()) }
                >Join Group</button>
            </label>
        </div>
    );
}
