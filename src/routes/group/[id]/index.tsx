import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import * as serverUtils from '~/lib/utils/server';
import GroupUsers from '~/components/GroupUsers';
import './group.css';

export default function Group() {
    const params = useParams();
    const group = createAsync(() => serverUtils.getGroup(params.id));

    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <GroupUsers group={group()}/>
        </main>
    );
}
