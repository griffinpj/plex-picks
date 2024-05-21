import { For, Show, Suspense, createResource, createSignal } from "solid-js";
import * as serverUtils from '~/lib/utils/server';
import MovieCard from '~/components/MovieCard';
import type { Movie } from '~/types/plex';
import './index.css';
import { createStore } from "solid-js/store";

const SAMPLE_SIZE = 25;

export default function Movies (props: any) {
    const [ size ] = createSignal(1);
    const [ page, setPage ] = createSignal(0);

    const [ movies, mutateMovies ] = createStore(props.movies);

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
    return (
        <div class="flex column space-between">
            <div class="m-top-16">
                <button class={'m-top-16 narrow ' + (isMinPage() ? 'disabled' : 'yellow')} disabled={isMinPage()} onClick={handlePrev}>Prev</button>
                <button class={'narrow ' + (isMaxPage() ? 'disabled' : 'yellow')} disabled={isMaxPage()} onClick={handleNext}>Next</button>
            </div>
            <div class="movie-gallery">
                <Suspense>
                    <For each={paginatedMovies()}>{(movie: Movie, i) => (
                    <div class="flex column">
                        <MovieCard 
                            nextMovie={handleNext}
                            setUserPicks={props.setUserPicks} 
                            userPicks={props.userPicks} 
                            movie={movie}
                        />
                    </div>
                    )}</For>
                </Suspense>
            </div>
        </div>
    );
}
