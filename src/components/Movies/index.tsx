import { For, Show, Suspense, createResource, createSignal } from "solid-js";
import * as serverUtils from '~/lib/utils/server';
import MovieCard from '~/components/MovieCard';
import type { Movie } from '~/types/plex';
import './index.css';
import { createStore } from "solid-js/store";

const SAMPLE_SIZE = 25;

export default function Movies (props: any) {
    // Signals
    const [ movies, setMovies ] = createStore(props.movies);

    const [ loadingMovies, setLoadingMovies ] = createSignal(false);
    const [ size ] = createSignal(5);
    const [ page, setPage ] = createSignal(0);

    const isMaxPage = () => (page() * size()) >= ((SAMPLE_SIZE < movies.length ? SAMPLE_SIZE : movies.length) - size());
    const isMinPage = () => page() === 0;

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

    const paginatedMovies = () => movies?.slice(page() * size(), (page() * size()) + size());

    /* TODO 
        save movies to group
        only load and save movies if there aren't any on the group
    */
    return (
        <Show when={movies?.length} fallback={
            <Show when={!loadingMovies()} fallback={
                    <p class="text-white">Loading picks ...</p>
                }>
                <button class="yellow">Pick movies</button>
            </Show>
        }>
            <div class="flex column space-between">
                <div class="movie-gallery">
                    <Suspense>
                        <For each={paginatedMovies()}>{(movie: Movie, i) => (
                            <MovieCard movie={movie}/>
                        )}</For>
                    </Suspense>
                </div>
                <div class="m-top-32">
                    <button class={'narrow ' + (isMinPage() ? 'disabled' : 'yellow')} disabled={isMinPage()} onClick={handlePrev}>Prev</button>
                    <button class={'narrow ' + (isMaxPage() ? 'disabled' : 'yellow')} disabled={isMaxPage()} onClick={handleNext}>Next</button>
                </div>
            </div>
        </Show>
    );
}
