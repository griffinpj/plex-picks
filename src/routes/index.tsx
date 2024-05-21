import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";
import InitGroup from '~/components/InitGroup';
import * as serverUtils from '~/lib/utils/server'


export default function Home() {
    const [ user, { mutate } ]  = createResource(serverUtils.getUser);

    const isAuthenticated = () => !!user()?.plex_token;

    setInterval(async () => {
        const user = await serverUtils.getUser();
        mutate(user);
    }, 2000);

    return (
        <main>
            <Title>Plex Picks</Title>
            <h1>Plex Picks</h1>
            <InitGroup isAuthenticated={isAuthenticated} />
        </main>
    );
}
