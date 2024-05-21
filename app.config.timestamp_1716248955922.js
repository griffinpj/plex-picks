// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import devtools from "solid-devtools/vite";
var app_config_default = defineConfig({
  middleware: "./src/lib/middleware/index.ts",
  vite: {
    // vite options
    plugins: [
      devtools({
        /* features options - all disabled by default */
        autoname: true
        // e.g. enable autoname
      })
    ]
  }
});
export {
  app_config_default as default
};
