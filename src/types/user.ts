import type { Pick } from "./plex";


export type User = {
    alias: string,
    plex_pin: number | undefined,
    plex_token: string | undefined,
    picks: { 
        [key: string]: {
            [movieId: string]: boolean
        } 
    }
};
