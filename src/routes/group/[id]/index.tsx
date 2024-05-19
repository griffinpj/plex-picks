import { useParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import './group.css';

const ClientGroup = clientOnly(() => import('~/components/Group'));

export default function GroupPage() {
    const params = useParams();
    return (
        <main>
            <ClientGroup link={params.id}/>
        </main>
    );
}
