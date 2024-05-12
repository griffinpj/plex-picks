import { Title } from "@solidjs/meta";
import GroupUsers from '~/components/GroupUsers';
import './group.css';

export default function Group() {
    return (
        <main>
        <Title>Plex Picks</Title>
        <h1>Get Ready!</h1>
        <GroupUsers />
        </main>
    );
}
