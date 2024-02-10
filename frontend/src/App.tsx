import { useEffect } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import Form from "./components/Form";
import useEnvVars from "./hooks/useEnv";
import { useEnvVarsStore } from "./stores/envVarsStore";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {
    async function initializeEnvVars() {
        const clientEnvVars = await GetLocalChatEnvVars();
        console.log("clientEnvVars", clientEnvVars);
        const envVars = JSON.parse(clientEnvVars);
        useEnvVarsStore.getState().setEnvVars(envVars);
    }

    useEffect(() => {
        const startEnvs = async () => {
            await initializeEnvVars();
        }
        startEnvs();
    }, []);

    const { zustandVar: envVars, setEnvVars, checkIfAllEnvVarsAreSet } = useEnvVarsStore();

    console.log(checkIfAllEnvVarsAreSet());

    return <>{checkIfAllEnvVarsAreSet() ? <Chat /> : <Form />}</>;
}

export default App;
