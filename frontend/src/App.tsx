import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../wailsjs/go/main/App";
import Chat from "./components/Chat";
import { EnvVars } from "./utils/customTypes";
import useUserStore from "./stores/userStore";
import useEnvironmentStore from "./stores/environmentStore";
import Form from "./components/Form";
import { useTranslation } from "react-i18next";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {
    const { t } = useTranslation();
    const [startup, setStartup] = useState<boolean>(true);
    const [allVarsSet, setAllVarsSet] = useState<boolean>(false);

    // grab state variables from store
    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const socketPort = useEnvironmentStore((state) => state.socketPort);
    const clientOs = useEnvironmentStore((state) => state.clientOs);
    const myUsername = useUserStore((state) => state.myUsername);
    const myId = useUserStore((state) => state.myId);

    const setSocketIp = useEnvironmentStore((state) => state.setSocketIp);
    const setSocketPort = useEnvironmentStore((state) => state.setSocketPort);
    const setClientOs = useEnvironmentStore((state) => state.setClientOs);
    const setMyUsername = useUserStore((state) => state.setMyUsername);
    const setMyId = useUserStore((state) => state.setMyId);

    useEffect(() => {
        async function initializeEnvVars() {
            const clientEnvVars: string = await GetLocalChatEnvVars();
            const envVars: EnvVars = JSON.parse(clientEnvVars);
            setSocketIp(envVars.ip);
            setSocketPort(envVars.port);
            setClientOs(envVars.os);
            setMyUsername(envVars.username);
            setMyId(envVars.id);
        }
        async function startEnvs() {
            // Wait for the environment variables to be set
            await initializeEnvVars();
            // timeout to allow the env vars to be set
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        async function startup() {
            await initializeEnvVars();
            await startEnvs();
        }
        startup();
    }, []);

    useEffect(() => {
        if (socketPort === "" || socketIp === "" || clientOs === "" || myUsername === "" || myId === "") {
            setAllVarsSet(false);
            setStartup(false);
        } else {
            setAllVarsSet(true);
            setStartup(false);
        }
    }, [socketIp, socketPort]);

    if (startup) {
        return <div className="flex justify-center items-center h-screen">{t("loading_app")}</div>;
    } else if (!allVarsSet) {
        return <Form setAllVarsSet={setAllVarsSet} />;
    }
    return <Chat />;
}

export default App;
