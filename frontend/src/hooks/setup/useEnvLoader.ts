import useUserStore from "../../stores/userStore";
import useEnvironmentStore from "../../stores/environmentStore";
import {useEffect, useState} from "react";
import {GetLocalChatEnvVars } from "../../../wailsjs/go/main/App";
import {EnvVars} from "../../utils/customTypes";

export function useEnvironmentVariablesLoader() {

    const [allEnvVariableSet, setAllEnvVariableSet] = useState<boolean>(false);
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

        async function startup() {
            await initializeEnvVars();
        }

        startup().then(async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
        });
    }, []);


    useEffect(() => {

        if (socketPort === "" || socketIp === "" || clientOs === "" || myUsername === "" || myId === "") {
            setAllEnvVariableSet(false);

        } else {
            setAllEnvVariableSet(true);
        }
    }, [socketIp, socketPort, myUsername, myId]);

    return {allEnvVariableSet};
}