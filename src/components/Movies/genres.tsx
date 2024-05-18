import { createAsync } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js"
import * as serverUtils from '~/lib/utils/server';

export default function Genres (props: any) {
    const genres = createAsync(serverUtils.getGenres, { initialValue: [] });
    props.setGenreFilter(genres);
    
    const handleClick = (context: { genre: string, idx: number }) => () => {
        if (props.genreFilter.includes(context.genre)) {
            props.setGenreFilter(props.genreFilter.filter(g => g !== context.genre));
            return;
        }

        props.setGenreFilter([...(props.genreFilter), context.genre]);
    };

    return (
        <Suspense>
            <Show when={genres()?.length} fallback={
                <p class="text-white">Loading genres ...</p> 
            }>
                <div class="genres">
                    <For each={genres()}>{(genre: string, i: number) => (
                        <a onClick={handleClick({ genre, idx: i })} 
                        class={'text-white flex row ' + (!props.genreFilter.includes(genre) ? 'clicked' : '')} for={`genre${i}`}>
                            {genre} 
                        </a>
                    )}</For>
                </div>
            </Show>
        </Suspense>
    );
}
