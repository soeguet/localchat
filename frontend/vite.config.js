/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vitest/config";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react"; // https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true, // aktiviert die Generierung von Source Maps
        // Weitere Optionen zur Konfiguration der Source Maps:
        // sourcemap: 'inline', // Generiert inline Source Maps
        // sourcemap: 'hidden', // Generiert keine Source Maps
    },
    plugins: [
        react(),
        topLevelAwait({
            promiseExportName: "__tla",
            promiseImportName: function (i) { return "__tla_".concat(i); },
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
