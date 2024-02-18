import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import { EnvVars } from "./utils/customTypes";
import useUserStore from "./stores/userStore";
import useEnvironmentStore from "./stores/environmentStore";
import Form from "./components/Form";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {
    const [startup, setStartup] = useState<boolean>(true);
    const [allVarsSet, setAllVarsSet] = useState<boolean>(false);

    useEffect(() => {
        async function initializeEnvVars() {
            const clientEnvVars: string = await GetLocalChatEnvVars();
            const envVars: EnvVars = JSON.parse(clientEnvVars);
            useEnvironmentStore.getState().setSocketIp(envVars.ip);
            useEnvironmentStore.getState().setSocketPort(envVars.port);
            useEnvironmentStore.getState().setClientOs(envVars.os);
            useUserStore.getState().setMyUsername(envVars.username);
            useUserStore.getState().setMyId(envVars.id);
        }
        async function startEnvs() {
            // Wait for the environment variables to be set
            await initializeEnvVars();
            // timeout to allow the env vars to be set
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log("FINISHED");
        }
        async function startup() {
            await initializeEnvVars();
            await startEnvs();
        }
        startup();
    }, []);

    useEffect(() => {
        async function checkIfVarsAreAllSet() {
            console.log("checking if vars are all set");
            const socketIp = useEnvironmentStore.getState().socketIp;
            const socketPort = useEnvironmentStore.getState().socketPort;
            const clientOs = useEnvironmentStore.getState().clientOs;
            const myUsername = useUserStore.getState().myUsername;
            const myId = useUserStore.getState().myId;

            if (socketPort === "" || socketIp === "" || clientOs === "" || myUsername === "" || myId === "") {
                setAllVarsSet(false);
                setStartup(false);
                throw new Error("Not all environment variables are set");
            } else {
                setAllVarsSet(true);
                setStartup(false);
            }
        }
        async function check() {
            await checkIfVarsAreAllSet();
        }
        check();
    }, [useEnvironmentStore.getState().socketIp, useEnvironmentStore.getState().socketPort]);

    if (startup) {
        return <div className="flex justify-center items-center h-screen">loading...</div>;
    } else if (!allVarsSet) {
        return <Form setStartup={setStartup} />;
    }
    return <Chat />;
}

export default App;
