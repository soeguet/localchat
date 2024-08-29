import {GetLocalChatEnvVars} from "../../../wailsjs/go/main/App";
import {useUserStore} from "../../stores/userStore";
import packageInfo from "../../../package.json";
import {useVersionStore} from "../../stores/versionStore";
import {main} from "../../../wailsjs/go/models";

export async function useEnvironmentVariablesLoader() {
    const envVars = await GetLocalChatEnvVars() as main.EnvVars

    useUserStore.getState().setSocketIp(envVars.ip);
    useUserStore.getState().setSocketPort(envVars.port);
    useUserStore.getState().setClientOs(envVars.os);
    useUserStore.getState().setMyUsername(envVars.username);
    useUserStore.getState().setMyId(envVars.id);
    useUserStore.getState().setEnvironment(envVars.environment);

    const version = packageInfo.version;
    useVersionStore.getState().setVersion(version);
}