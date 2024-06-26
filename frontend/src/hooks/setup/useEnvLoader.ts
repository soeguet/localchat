import { useUserStore } from "../../stores/userStore";
import { useEffect, useState } from "react";
import { GetLocalChatEnvVars } from "../../../wailsjs/go/main/App";

export function useEnvironmentVariablesLoader() {
	const [allEnvVariableSet, setAllEnvVariableSet] = useState(false);
	GetLocalChatEnvVars().then((envVars) => {
		const envVarsObj = JSON.parse(envVars);
		useUserStore.getState().setSocketIp(envVarsObj.ip);
		useUserStore.getState().setSocketPort(envVarsObj.port);
		useUserStore.getState().setClientOs(envVarsObj.os);
		useUserStore.getState().setMyUsername(envVarsObj.username);
		useUserStore.getState().setMyId(envVarsObj.id);
	});

	if (
		useUserStore.getState().socketPort === "" ||
		useUserStore.getState().socketIp === "" ||
		useUserStore.getState().clientOs === "" ||
		useUserStore.getState().myUsername === "" ||
		useUserStore.getState().myId === ""
	) {
		setAllEnvVariableSet(false);
	} else {
		setAllEnvVariableSet(true);
	}

	return { allEnvVariableSet };
}
