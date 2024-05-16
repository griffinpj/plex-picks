import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import GroupUsers from '~/components/GroupUsers';
import Movies from '~/components/Movies';
import type { Group } from '~/types/group';
import './group.css';

export default function Group() {
    const params = useParams();

    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <h2 class="text-white">Join with: {params.id}</h2>
        <GroupUsers />
        <Movies />
        </main>
    );
}
