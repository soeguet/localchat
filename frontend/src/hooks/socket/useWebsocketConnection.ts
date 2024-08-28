import {useEffect, useState} from "react";
import { initWebSocket} from "../../utils/socket/socket";
import { useUserStore } from "../../stores/userStore";
import { errorLogger } from "../../logger/errorLogger";

export function useWebsocketConnection() {
	const socketPort = useUserStore((store) => store.socketPort);
	const socketIp = useUserStore((store) => store.socketIp);
	const [counter, setCounter] = useState(0);

	useEffect(() => {

		// this function fetches the ip and port via getState()
		initWebSocket();
		console.log("useEffect in useWebsocketConnection" + counter);
		setCounter((state) => state + 1);

		// also re-set the error logger socket IP and port
		errorLogger.setSocketIP(socketIp);
		errorLogger.setSocketPort(socketPort);

	}, [socketIp, socketPort]);
}