import { defineConfig } from 'vitest/config'
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        topLevelAwait({
            promiseExportName: "__tla",
            promiseImportName: (i) => `__tla_${i}`,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    server: {
        port: 3000,
    },
});