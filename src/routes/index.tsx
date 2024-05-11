import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import PlexPicker from '~/components/PlexPicker';
import InitGroup from '~/components/InitGroup';

export default function Home() {
  return (
    <main>
      <Title>Plex Picks</Title>
      <h1>Plex Picks</h1>
      <InitGroup />
    </main>
  );
}
