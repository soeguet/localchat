import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";

export function useUserEnvChecker() {
	const [socketVariableAllAvailable, setSocketVariableAllAvailable] =
		useState(false);
	const socketIp = useUserStore((state) => state.socketIp);
	const socketPort = useUserStore((state) => state.socketPort);
	const username = useUserStore((state) => state.myUsername);

	useEffect(() => {
		if (socketIp === "" || socketPort === "" || username === "") {
			setSocketVariableAllAvailable(false);
			return;
		}

		setSocketVariableAllAvailable(true);
	}, [socketIp, socketPort, username]);
	return socketVariableAllAvailable;
}
