import * as utils from '~/lib/utils';
import * as request from '~/lib/utils/request';

import SessionAlias from '~/components/SessionAlias';
import "./InitGroup.css";

export default function InitGroup (props: any) {
    const createGroupHandler = async () => {
        const data = await request.post('/api/group/new', {});
        utils.navigateTo(`/group/${data.link}`);
    };

    return (
        <div class="init-group-container">
            <SessionAlias alias={props.alias} setAlias={props.setAlias} />
            <h3> {props.alias} </h3>
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
                />
            </label>
        </div>
    );
}
