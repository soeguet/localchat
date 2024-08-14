import { GetLocalChatEnvVars } from "../../../wailsjs/go/main/App";
import { useUserStore } from "../../stores/userStore";
import packageInfo from "../../../package.json";
import {useVersionStore} from "../../stores/versionStore";

export async function useEnvironmentVariablesLoader() {
	GetLocalChatEnvVars().then((envVars) => {
		const envVarsObj = JSON.parse(envVars);

		useUserStore.getState().setSocketIp(envVarsObj.ip);
		useUserStore.getState().setSocketPort(envVarsObj.port);
		useUserStore.getState().setClientOs(envVarsObj.os);
		useUserStore.getState().setMyUsername(envVarsObj.username);
		useUserStore.getState().setMyId(envVarsObj.id);

		const version = packageInfo.version;
		useVersionStore.getState().setVersion(version);
	});
}