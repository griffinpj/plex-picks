import * as request from '~/lib/utils/request';
import * as serverUtils from '~/lib/utils/server';
import { Show, Suspense, createResource, createSignal } from 'solid-js';
import './index.css';

export default function SessionAlias() {
    
    const [alias, { mutate }] = createResource(async () => {
        const session = await serverUtils.getSession();
        return await serverUtils.getAlias(session) 
    });

    const [input, setInput] = createSignal(alias()); 

    const updateNickname = async function () {
        await request.post(`/api/session/alias`, {
            alias: input()
        });

        mutate(input());
    };

    const updateAliasState = (e: KeyboardEvent) => {
        if (e.target?.value) {
            setInput(e.target.value);
        }
    };

    return (
        <div class="flex m-top-16 m-left-8">
            <Suspense>
                <Show when={alias()}>
                    <input
                        type="text"
                        placeholder="Nickname"
                        autocomplete="off"
                        class="blue input-button"
                        id="session-nickname"
                        value={alias()}
                        onKeyUp={updateAliasState}
                    />
                    <button class="input-button blue narrow" onClick={updateNickname}>
                        Update 
                    </button>
                </Show>
            </Suspense>
        </div>
    );
}

