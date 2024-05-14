import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import * as request from '~/lib/utils/request';
import GroupUsers from '~/components/GroupUsers';
import './group.css';
import { createResource, createSignal } from "solid-js";
import type { Group } from '~/types/group';

const fetchGroup = async (id: string) => {
    const data = await request.get(`http://localhost:3001/api/group/${id}`);
    return data.group;
};

export default function Group() {
    const params = useParams();

    const [ linkId ] = createSignal(params.id);
    const [ group, { refetch }] = createResource(linkId, fetchGroup);

    // setInterval(() => refetch(), 3000)
    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <GroupUsers group={group()} refresh={refetch} />
        </main>
    );
}
