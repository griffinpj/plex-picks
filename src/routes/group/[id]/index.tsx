import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import GroupUsers from '~/components/GroupUsers';
import Movies from '~/components/Movies';
import type { Group } from '~/types/group';
import './group.css';
import Genres from "~/components/Movies/genres";
import { createStore } from "solid-js/store";

export default function Group() {
    const params = useParams();
    const [ genreFilter, setGenreFilter ] = createStore([]);

    return (
        <main>
            <Title>Plex Picks</Title>
            <Movies genreFilter={genreFilter}/>
            <Genres genreFilter={genreFilter} setGenreFilter={setGenreFilter}/>
            <h2 class="text-white">Join with: {params.id}</h2>
            <GroupUsers />
        </main>
    );
}
