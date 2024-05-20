import { defineConfig } from "@solidjs/start/config";
import devtools from 'solid-devtools/vite'

export default defineConfig({
    middleware: './src/lib/middleware/index.ts',
    vite: {
        // vite options
        plugins: [
            devtools({
              /* features options - all disabled by default */
              autoname: true, // e.g. enable autoname
            }),
        ],
    },
});

