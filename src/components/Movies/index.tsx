import { For, Show, Suspense } from "solid-js";
import { createStore } from 'solid-js/store';
import * as request from '~/lib/utils/request';
import type { Movie } from '~/types/plex';
import './index.css';

export default function Movies() {
    const [movies, setMovies] = createStore([]);
    
    const getMovies = async () => {
        const res = await request.get('/api/plex/movies');
        if (res.movies) {
            setMovies(res.movies);
        }
    };

    return (
        <div>
            <button class="blue" onClick={getMovies}> Get Movies </ button>
            Plex Movies
            <div class="movie-gallery">
                <Suspense>
                    <Show when={movies}>
                        <For each={movies}>{(movie: Movie, i) => (
                            <img 
                                class="movie poster"
                                src={movie.thumb} 
                            /> 
                        )}</For>
                    </Show>
                </Suspense>
            </div>
        </div>
    );
}
