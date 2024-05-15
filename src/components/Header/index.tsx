import SessionAlias from '../SessionAlias';
import * as utils from '~/lib/utils';
import './index.css';

export default function Header() {
    const homeClick = () => utils.navigateTo('/');

    return (
        <div class="header space-between flex row">
            <div class="left">
                <button onClick={homeClick} class="button red narrow">Home</button>
                <button class="blue narrow">Plex Sign In</button>
            </div>
            <div class="right">
                <SessionAlias /> 
            </div>
        </div>
   );
}
