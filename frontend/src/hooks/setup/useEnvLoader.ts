import useUserStore from "../../stores/userStore";
import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../../../wailsjs/go/main/App";

export function useEnvironmentVariablesLoader() {
    const [allEnvVariableSet, setAllEnvVariableSet] = useState(false);
    const {
        socketIp,
        setSocketIp,
        socketPort,
        setSocketPort,
        clientOs,
        setClientOs,
        myUsername,
        setMyUsername,
        myId,
        setMyId,
    } = useUserStore();

    useEffect(() => {
        GetLocalChatEnvVars().then((envVars) => {
            const envVarsObj = JSON.parse(envVars);
            setSocketIp(envVarsObj.ip);
            setSocketPort(envVarsObj.port);
            setClientOs(envVarsObj.os);
            setMyUsername(envVarsObj.username);
            console.log("envVarsObj.id", envVarsObj.id);
            setMyId(envVarsObj.id);
        });
    }, []);

    useEffect(() => {
        if (socketPort === "" || socketIp === "" || clientOs === "" || myUsername === "" || myId === "") {
            setAllEnvVariableSet(false);
        } else {
            setAllEnvVariableSet(true);
        }
    }, [socketIp, socketPort, myUsername, myId]);

    return { allEnvVariableSet };
}
