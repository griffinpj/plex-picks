import { useSession } from "vinxi/http";
import * as plex from '~/lib/plex';

export async function attachSession (request: Request) {
    'use server';

    request.locals.plex_token = '123'; 
}
