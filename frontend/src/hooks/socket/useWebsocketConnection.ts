import { useEffect } from "react";
import useWebsocketStore from "../../stores/websocketStore";
import { initWebSocket } from "../../utils/socket";
import useUserStore from "../../stores/userStore";
import { handleIncomingMessages } from "../../utils/handleIncomingMessages";

function useWebsocketConnection() {
    const socketPort = useUserStore((store) => store.socketPort);
    const socketIp = useUserStore((store) => store.socketIp);
    // typing state

    const setIsConnected = useWebsocketStore((state) => state.setIsConnected);

    useEffect(() => {
        //console.log("Connecting to WebSocket");
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, [socketIp, socketPort]);
}

export default useWebsocketConnection;
