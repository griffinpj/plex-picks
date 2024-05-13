import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import Header from '~/components/Header';
import './styles';

export default function App() {
    return (
        <Router
        root={props => (
            <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <Header />
            <Suspense>{props.children}</Suspense>
            </MetaProvider>
            )}
        >
        <FileRoutes />
        </Router>
       );
}
