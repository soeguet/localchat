import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore";

export function useUserEnvChecker() {
    const [allEnvVars, setAllEnvVars] = useState(false);
    const socketIp = useUserStore((state) => state.socketIp);
    const socketPort = useUserStore((state) => state.socketPort);
    const username = useUserStore((state) => state.myUsername);

    useEffect(() => {
        if (socketIp === "" || socketPort === "" || username === "") {
            setAllEnvVars(false);
            return;
        }

        setAllEnvVars(true);
    }, [socketIp, socketPort, username]);

    return allEnvVars;
}