import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import './styles';

export default function App() {
    return (
        <Router
        root={props => (
            <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <div class="nav-bar">
                <a href="/" class="red narrow">Home</a>
                <a href="javascript:void(0);" class="blue narrow">Plex Sign In</a>
            </div>
            <Suspense>{props.children}</Suspense>
            </MetaProvider>
            )}
        >
        <FileRoutes />
        </Router>
       );
}
