import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import Form from "./components/Form";
import useEnvVarsStore from "./stores/envVarsStore";
import { EnvVars } from "./utils/customTypes";

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
    function checkIfEnvVarsAllSet(envVars: EnvVars | null) {
        if (envVars === null) {
            throw new Error("envVars is null");
        }
        if (envVars.username !== "" && envVars.ip !== "" && envVars.port !== "") {
            setIsEnvVarsLoaded(true);
        }
    }

    useEffect(() => {
        async function initializeEnvVars() {
            const clientEnvVars = await GetLocalChatEnvVars();
            const envVars: EnvVars = JSON.parse(clientEnvVars);
            useEnvVarsStore.getState().setEnvVars(envVars);
            useEnvVarsStore.getState().setClientId(envVars.id);
        }
        async function startEnvs() {
            // Wait for the environment variables to be set
            await initializeEnvVars();
            // timeout to allow the env vars to be set
            await new Promise((resolve) => setTimeout(resolve, 500));

            // fetch live values, null check, and check if all env vars are set
            const store = useEnvVarsStore.getState().zustandVar;
            if (store === null) {
                return;
            }
            checkIfEnvVarsAllSet(store);

            // set startup to false so the actual chat can start rendering
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
