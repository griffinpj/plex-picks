import { For, Show, Suspense, createResource, createSignal } from "solid-js";
import * as serverUtils from '~/lib/utils/server';
import MovieCard from '~/components/MovieCard';
import type { Movie } from '~/types/plex';
import './index.css';

const SAMPLE_SIZE = 25;

export default function Movies() {
    const [ movies, { refetch, mutate }] = createResource(async () => serverUtils.getMoviesSample(SAMPLE_SIZE));
    const [ size ] = createSignal(5);
    const [ page, setPage ] = createSignal(0);

    const isMaxPage = () => (page() * size()) >= (SAMPLE_SIZE - size());
    const isMinPage = () => page() === 0;

    const paginatedMovies = () => movies()?.slice(page() * size(), (page() * size()) + size());

    const handleNext = () => {
        if (isMaxPage()) {
            return;
        }

        setPage(page() + 1);
    };

    const handlePrev = () => {
        if (isMinPage()) { return; }
        setPage(page() - 1);
    };

    /* TODO 
        save movies to group
        only load and save movies if there aren't any on the group
    */
    return (
        <div class="flex column space-between">
            <div class="movie-gallery">
                <Suspense>
                    <Show when={movies()}>
                        <For each={paginatedMovies()}>{(movie: Movie, i) => (
                            <MovieCard movie={movie}/>
                        )}</For>
                    </Show>
                </Suspense>
            </div>
            <div class="m-top-32">
                <button class={'narrow ' + (isMinPage() ? 'disabled' : 'yellow')} disabled={isMinPage()} onClick={handlePrev}>Prev</button>
                <button class={'narrow ' + (isMaxPage() ? 'disabled' : 'yellow')} disabled={isMaxPage()} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
