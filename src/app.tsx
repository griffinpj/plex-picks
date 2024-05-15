import { MetaProvider, Title } from "@solidjs/meta";
import { Router, cache, createAsync } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal } from "solid-js";
import * as serverUtils from '~/lib/utils/server';

import Header from '~/components/Header';
import './styles';

export default function App() {
    return (
        <Router root={props => (
            <MetaProvider>
                <Title>SolidStart - Basic</Title>
                <Header  />
                <Suspense>{props.children}</Suspense>
            </MetaProvider>
        )}>
            <FileRoutes />
        </Router>
       );
}
