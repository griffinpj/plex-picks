import * as utils from '~/lib/utils';
import * as request from '~/lib/utils/request';
import "./InitGroup.css";

export default function InitGroup() {
    // TODO build out join group functinality
    // TODO update users list for others on /group/[id] page when other join
    // stream ? polling ?

    const createGroupHandler = async () => {
        const data = await request.post(`/api/group/new`, {
            msg: 'hello world'
        });

        utils.navigateTo(`/group/${data.link}`);
    };

    return (
        <div class="init-group-container">
            <a 
                id="j-create-group" 
                class="red"
                onClick={ createGroupHandler }
            >Create Group</a>
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
