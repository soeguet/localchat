import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import { useEnvVarsStore } from "./stores/useEnvVarsStore";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {
    const [isEnvVarsLoaded, setIsEnvVarsLoaded] = useState(false);

    useEffect(() => {
        async function initializeEnvVars() {
            const clientEnvVars = await GetLocalChatEnvVars();
            console.log("clientEnvVars", clientEnvVars);
            const envVars = JSON.parse(clientEnvVars);
            useEnvVarsStore.getState().setEnvVars(envVars);
            setIsEnvVarsLoaded(true);
        }
        async function startEnvs() {
            await initializeEnvVars();
        }
        startEnvs();
    }, []);

    return <>{isEnvVarsLoaded ? <Chat /> : <div>Loading...</div>}</>;
}

export default App;
