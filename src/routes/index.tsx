import { Title } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { createSignal } from "solid-js";
import InitGroup from '~/components/InitGroup';
import * as serverUtils from '~/lib/utils/server';


export default function Home() {
    const getSession = cache(serverUtils.getSession, 'session');
    const getAlias = cache(serverUtils.getAlias, 'alias');

    const session = createAsync(() => getSession());
    const aliasAsync = createAsync(() => getAlias(session()));

    const currentAlias = aliasAsync();
    const [alias, setAlias] = createSignal(currentAlias);

    return (
        <main>
            <Title>Plex Picks</Title>
            <h1>Plex Picks</h1>
            <InitGroup alias={alias()} session={session()} setAlias={setAlias} />
        </main>
    );
}
