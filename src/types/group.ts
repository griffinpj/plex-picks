import type { Movie } from './plex';

export type Group = {
    owner: string,
    users: string [],
    stage: string,
    selection: Movie []

};
