import { useParams } from "@solidjs/router";
import Group from '~/components/Group';
import './group.css';

export default function GroupPage() {
    const params = useParams();
    return (
        <main>
            <Group link={params.id}/>
        </main>
    );
}
