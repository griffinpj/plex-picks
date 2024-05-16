import type { Movie } from '~/types/plex';

export default function MovieCard (props: { movie : Movie }) {

    console.log(props.movie);
    return (
        <div class="movie">
            <div class="img-wrapper">
                <img 
                    class="poster"
                    src={props.movie.thumb} 
                /> 
                <span class="img-desc">
                    <span class="tagline">
                        {props.movie.tagline}
                    </span>
                </span>
            </div>
            <div class="movie-meta">
                <span class="title">{props.movie.title}</span>
                <span class="year">{props.movie.year}</span>
            </div>
        </div>
    );
};
