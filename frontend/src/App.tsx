import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import { useEnvVarsStore } from "./stores/useEnvVarsStore";
import { EnvVars } from "./utils/customTypes";
import Form from "./components/Form";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {
    const [startup, setStartup] = useState<boolean>(true);
    const [isEnvVarsLoaded, setIsEnvVarsLoaded] = useState(false);

    /**
     * Checks if all environment variables are set.
     * @param envVars - The environment variables object.
     */
    function checkIfEnvVarsAllSet(envVars: EnvVars) {
        if (envVars.username !== "" && envVars.ip !== "" && envVars.port !== "") {
            setIsEnvVarsLoaded(true);
        }
    }

    useEffect(() => {
        async function initializeEnvVars() {
            const clientEnvVars = await GetLocalChatEnvVars();
            const envVars: EnvVars = JSON.parse(clientEnvVars);
            useEnvVarsStore.getState().setEnvVars(envVars);
        }
        async function startEnvs() {
            await initializeEnvVars();
            await new Promise((resolve) => setTimeout(resolve, 500));
            checkIfEnvVarsAllSet(useEnvVarsStore.getState().zustandVar);
            setStartup(false);
        }
        startEnvs();
    }, []);

    if (startup) {
        return <div className="flex justify-center items-center h-screen">loading...</div>;
    }
    return <>{isEnvVarsLoaded ? <Chat /> : <Form checkIfEnvVarsAllSet={checkIfEnvVarsAllSet} />}</>;
}

export default App;
