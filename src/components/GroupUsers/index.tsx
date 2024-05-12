import * as serverUtils from '~/lib/utils/server';
import { createAsync, useParams, cache } from '@solidjs/router';
import "./GroupUsers.css";

export default function InitGroup() {
    const params = useParams();
    const group = createAsync(() => cache(serverUtils.getGroup, 'group')(params.id));

    return (
        <div class="group-users-container">
            <a class="button red">Start Picking</a>
            <ul>
                {group() && group().users!.map((user: string) => (
                    <li> {user} </li>
                ))}
            </ul>
        </div>
    );
}
