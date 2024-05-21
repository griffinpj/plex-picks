import { useParams } from '@solidjs/router';
import * as serverUtils from '~/lib/utils/server';
import type { Movie, Pick } from '~/types/plex';

export default function MovieCard (props: any) {
    const params = useParams();

    const handleLike = async (groupId: string, pick: boolean, movie: Movie) => {
        const picks = await serverUtils.groupPick(movie, groupId, pick);
        props.setUserPicks(picks);
        props.nextMovie();
    };

    const isPicked = (movie: Movie) => {
        if (props.userPicks && props.userPicks[params.id] && props.userPicks[params.id] && props.userPicks[params.id][movie.id] !== undefined) {
            return props.userPicks[params.id][movie.id] ? ' green' : ' red';;
        }
        return '';
    };

    return (
        <div class="movie">
            <div class="img-wrapper">
                <img 
                    class={'poster' + isPicked(props.movie)}
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
            <div class="flex row m-top-8">
                <button class="red narrow" onClick={() => handleLike(params.id, false, props.movie)}>No</button>
                <button class="green narrow" onClick={() => handleLike(params.id, true, props.movie)}>Yes</button>
            </div>
        </div>
    );
};
