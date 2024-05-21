import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";
import InitGroup from '~/components/InitGroup';
import * as serverUtils from '~/lib/utils/server'


export default function Home() {
    const [ user ]  = createResource(serverUtils.getUser);

    const isAuthenticated = () => !!user()?.plex_token;

    return (
        <main>
            <Title>Plex Picks</Title>
            <h1>Plex Picks</h1>
            <InitGroup isAuthenticated={isAuthenticated} />
        </main>
    );
}
