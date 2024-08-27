import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
import "./config/i18n";
import {WindowSetTitle} from "../wailsjs/runtime";
import {useEnvironmentVariablesLoader} from "./hooks/setup/useEnvLoader";
import {errorLogger} from "./logger/errorLogger";

WindowSetTitle("Localchat");

// Load environment variables
try {
    await useEnvironmentVariablesLoader();
} catch (error) {
    console.error("Failed to load environment variables");
    errorLogger.logError(error);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);