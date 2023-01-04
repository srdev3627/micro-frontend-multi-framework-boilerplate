import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: "svelte-product",
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./src/App.svelte",
      },
    }),
  ],
  build: {
    target: "esnext",
  },
  preview: {
    port: 4177,
  },
});
