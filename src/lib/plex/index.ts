// https://www.npmjs.com/package/plex-oauth
import { PlexOauth, IPlexClientDetails } from "plex-oauth"
import * as serverUtils from '~/lib/utils/server';
import * as sessionModel from '~/lib/session';
import type { User } from '~/types/user';

let clientInformation: IPlexClientDetails = {
    clientIdentifier: import.meta.env.VITE_PLEX_CLIENT, 
    product: import.meta.env.VITE_PLEX_PRODUCT,              
    device: "browser",
    version: "1",
    forwardUrl: import.meta.env.VITE_PLEX_FORWARD_URL,
    urlencode: true 
};
let plexOauth = new PlexOauth(clientInformation);

export const login = async () : Promise<{ url: string, pin: number }> => {
    'use server';
    try {
        const data = await plexOauth.requestHostedLoginURL();
        let [ hostedUILink, pinId ] = data;
        
        return new Promise((resolve) => resolve({ url: hostedUILink, pin: pinId }));

    } catch (e) { throw e}
};

export const checkForAuthToken = async (pinId: number) : Promise<string> => {
    'use server';
    try {
        const authToken = await plexOauth.checkForAuthToken(pinId);

        return new Promise((resolve) => resolve(authToken!));
    } catch (e) { throw (e); }
};

