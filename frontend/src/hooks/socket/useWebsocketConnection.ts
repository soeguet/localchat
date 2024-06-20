import { useEffect } from "react";
import { useWebsocketStore } from "../../stores/websocketStore";
import { closeWebSocket, initWebSocket } from "../../utils/socket";
import { useUserStore } from "../../stores/userStore";
import { handleIncomingMessages } from "../../utils/handleIncomingMessages";

function useWebsocketConnection() {
	const socketPort = useUserStore((store) => store.socketPort);
	const socketIp = useUserStore((store) => store.socketIp);

	const setIsConnected = useWebsocketStore((state) => state.setIsConnected);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		initWebSocket({
			onOpen: () => setIsConnected(true),
			onClose: () => {
				setIsConnected(false);
				closeWebSocket();
			},
			onMessage: (event) => {
				handleIncomingMessages(event);
			},
			onError: (event) => {
				console.error(event);
				setIsConnected(false);
				closeWebSocket();
			},
		});
	}, [socketIp, socketPort]);
}

export { useWebsocketConnection };
