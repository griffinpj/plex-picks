import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import * as serverUtils from '~/lib/utils/server';
import GroupUsers from '~/components/GroupUsers';
import './group.css';
import { createSignal } from "solid-js";

const mapAlias = (session: string) => {
    const userAlias = createAsync(() => serverUtils.getAlias(session));
    return userAlias() || session;
};

export default function Group() {
    const params = useParams();
    const groupAsync = createAsync(() => serverUtils.getGroup(params.id));
    
    let currentGroup = groupAsync(); 
    const [owner, setOwner] = createSignal(mapAlias(currentGroup?.owner));
    const [users, setUsers] = createSignal(currentGroup?.users.map(mapAlias));

    const refreshGroup = () => {
        const newGroup = groupAsync();

        let { owner, users = [] } = newGroup;
        owner = mapAlias(owner);
        users.push('1121');
        users = users.map(mapAlias);

        // TODO why does this refresh not trigger GroupUsers to re render !?!?
        setOwner(owner);
        setUsers([ ...users ]);
    };

    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <GroupUsers owner={owner()} users={users()} refresh={refreshGroup}/>
        </main>
    );
}
