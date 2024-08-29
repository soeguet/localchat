import { useEffect } from "react";
import { errorLogger } from "../../logger/errorLogger";
import { useUserStore } from "../../stores/userStore";
import { initWebSocket } from "../../utils/socket/socket";

export function useWebsocketConnection() {
	const socketPort = useUserStore((store) => store.socketPort);
	const socketIp = useUserStore((store) => store.socketIp);

	useEffect(() => {
		// this function fetches the ip and port via getState()
		initWebSocket();

		// also re-set the error logger socket IP and port
		errorLogger.setSocketIP(socketIp);
		errorLogger.setSocketPort(socketPort);
	}, [socketIp, socketPort]);
}