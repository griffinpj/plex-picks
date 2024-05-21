import SessionAlias from '../SessionAlias';
import * as utils from '~/lib/utils';
import * as serverUtils from '~/lib/utils/server';
import * as plex from '~/lib/plex';
import './index.css';
import { Show, Suspense, createSignal } from 'solid-js';
import { createAsync } from '@solidjs/router';

export default function Header() {
    const [hasToken, setHasToken] = createSignal(false);
    const homeClick = () => utils.navigateTo('/');

    const handlePlexLogin = async () => {
        const { url, pin } = await plex.login();

        await serverUtils.setPlexPin(pin);
        if (url) { utils.navigateTo(url); }
    };

    // Poll for plex changes
    const intervalFn = async () => {
        if (!hasToken()) {
            const isAuthenticated = await serverUtils.checkForPlexAuth();
            if (isAuthenticated) {
                setHasToken(true);
                return;
            }
        }
    };
    intervalFn();
    setInterval(intervalFn, 2000)

    return (
        <div class="flex column center m-top-16">
        <div class="flex row center">
            <button onClick={homeClick} class="button red medium">Home</button>
            <Suspense when={hasToken()}>
            <Show when={hasToken()} fallback={
            <button onClick={handlePlexLogin} class="blue medium">Plex Sign In</button>
            }>
            <button onClick={handlePlexLogin} class="yellow medium">Re-authenticate</button>
            </Show>
            </ Suspense>
        </div>
            <SessionAlias /> 
        </div>
   );
}
