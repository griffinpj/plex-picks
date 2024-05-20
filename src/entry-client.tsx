// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

import 'solid-devtools'
// or from 'solid-devtools/setup' if you're not using the vite plugin

mount(() => <StartClient />, document.getElementById("app")!);
