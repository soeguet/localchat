/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react"; // https://vitejs.dev/config/

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
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        // include: ["src/**/*.{js,ts}"],
        includeSource: ["src/**/*.{js,ts}"],
    },
    server: {
        port: 3000,
    },
    define: {
        "import.meta.vitest": "undefined",
    },
});
