import SessionAlias from '../SessionAlias';
import * as utils from '~/lib/utils';
import * as plex from '~/lib/plex';
import './index.css';

export default function Header() {
    const homeClick = () => utils.navigateTo('/');

    const handlePlexLogin = async () => {
        const data = await plex.login();

        utils.navigateTo(data?.url);
    };

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
