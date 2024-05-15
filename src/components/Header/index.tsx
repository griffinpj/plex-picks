import SessionAlias from '../SessionAlias';
import * as utils from '~/lib/utils';
import * as serverUtils from '~/lib/utils/server';
import * as plex from '~/lib/plex';
import './index.css';
import { createAsync } from '@solidjs/router';
import { checkForAuthToken } from '~/lib/plex';

export default function Header() {
    const homeClick = () => utils.navigateTo('/');

    const handlePlexLogin = async () => {
        const { url, pin } = await plex.login();

        await serverUtils.setPlexPin(pin);
        if (url) { utils.navigateTo(url); }
    };

    // Poll for plex changes
    const session = createAsync(() => serverUtils.getSession());
    setInterval(async () => {
        const user = await serverUtils.getUser(session());
        if (user?.plex_token) {
            return;
        }

        if (!user?.plex_pin) {
            return;
        }

        const token = await checkForAuthToken(user.plex_pin);
        if (!token) {
            return;
        }

        await serverUtils.setPlexToken(session(), token);
    }, 3000)

    return (
        <div class="header space-between flex row">
            <div class="left">
                <button onClick={homeClick} class="button red narrow">Home</button>
                <button onClick={handlePlexLogin} class="blue narrow">Plex Sign In</button>
            </div>
            <div class="right">
                <SessionAlias /> 
            </div>
        </div>
   );
}
