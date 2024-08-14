import { useEffect } from "react";
import { initWebSocket} from "../../utils/socket";
import { useUserStore } from "../../stores/userStore";
import { errorLogger } from "../../logger/errorLogger";

function useWebsocketConnection() {
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

export { useWebsocketConnection };