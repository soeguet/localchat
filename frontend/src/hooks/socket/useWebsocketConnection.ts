import { useEffect } from "react";
import { useWebsocketStore } from "../../stores/websocketStore";
import {
	closeWebSocket,
	initWebSocket,
	retrieveBannersFromSocket,
	retrieveClientListFromSocket,
	retrieveMessageListFromSocket,
	retrieveProfilePicturesHashesFromSocket,
} from "../../utils/socket";
import { useUserStore } from "../../stores/userStore";
import { handleIncomingMessages } from "../../utils/handleIncomingMessages";
import { errorLogger } from "../../logger/errorLogger";

function useWebsocketConnection() {
	const socketPort = useUserStore((store) => store.socketPort);
	const socketIp = useUserStore((store) => store.socketIp);

	const setIsConnected = useWebsocketStore((state) => state.setIsConnected);

	// biome-ignore lint/correctness/useExhaustiveDependencies: socketIp and socketPort are enough
	useEffect(() => {
		initWebSocket({
			onOpen: () => {
				setIsConnected(true);
				retrieveClientListFromSocket();
				retrieveProfilePicturesHashesFromSocket();
				retrieveMessageListFromSocket();
				retrieveBannersFromSocket();
			},
			onClose: () => {
				setIsConnected(false);
				closeWebSocket();
			},
			onMessage: async (event) => {
				await handleIncomingMessages(event);
			},
			onError: (event) => {
				errorLogger.logError(event);
				setIsConnected(false);
				closeWebSocket();
			},
		});

		// also re-set the error logger socket IP and port
		errorLogger.setSocketIP(socketIp);
		errorLogger.setSocketPort(socketPort);
	}, [socketIp, socketPort]);
}

export { useWebsocketConnection };
