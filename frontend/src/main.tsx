import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
import "./config/i18n";
import {WindowSetTitle} from "../wailsjs/runtime";
import {useEnvironmentVariablesLoader} from "./hooks/setup/useEnvLoader";

WindowSetTitle("Localchat");

await useEnvironmentVariablesLoader();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);