import * as request from '~/lib/utils/request';
import './index.css';
import { createSignal } from 'solid-js';

export default function SessionAlias(props : any) {
    const [input, setInput] = createSignal(props.alias);

    const updateNickname = async function () {
        const data = await request.post(`/api/session/alias`, {
            alias: input()
        });

        props.setAlias(input());
    };

    const updateAliasState = (e: KeyboardEvent) => {
        if (e.target?.value) {
            setInput(e.target.value);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nickname"
                autocomplete="off"
                class="blue"
                id="session-nickname"
                value={input()}
                onKeyUp={updateAliasState}
            />
            <button class="button blue narrow" onClick={updateNickname}>
                Update 
            </button>
        </div>
    );
}

