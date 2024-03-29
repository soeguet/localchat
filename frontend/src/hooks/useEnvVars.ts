import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../../wailsjs/go/main/App";
import { EnvVars } from "../utils/customTypes";

function useEnvVars() {
    async function retrieveLocalClientEnvVariables(): Promise<EnvVars> {
        const clientEnvVars = await GetLocalChatEnvVars();
        return JSON.parse(clientEnvVars);
    }
    const [envVars, setEnvVars] = useState<EnvVars>({
        id: "",
        username: "",
        ip: "",
        port: "",
        os: "",
    });

    const checkIfAllEnvVarsAreSet = (envVars: EnvVars) => {
        if (envVars.username !== "" && envVars.ip !== "" && envVars.port !== "" && envVars.os !== "") {
            return true;
        }
        return false;
    };

    const handleEnvVarsChange = (newEnvVars: EnvVars) => {
        setEnvVars(newEnvVars);
    };

    useEffect(() => {
        const checkForEnvData = async () => {
            await retrieveLocalClientEnvVariables().then((data: EnvVars) => {
                const envs = {
                    id: data.id,
                    username: data.username,
                    ip: data.ip,
                    port: data.port,
                    os: data.os,
                };
                setEnvVars(envs);
            });
        };

        checkForEnvData();
    }, []);

    return [envVars, handleEnvVarsChange, checkIfAllEnvVarsAreSet];
}

export default useEnvVars;
