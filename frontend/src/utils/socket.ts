import { Notification } from "../../wailsjs/go/main/App";
import { EnvVars } from "./../utils/customTypes";

type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent) => void;
    onError: (event: Event) => void;
    envVars: EnvVars;
};

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    socket = new WebSocket(`ws://${callbacks.envVars.ip}:${callbacks.envVars.port}`);
    socket.onopen = () => {
        Notification("localchat", "Connection opened");

        // one second timeout to give the socket some breathing room :D
        const timeout = setTimeout(() => {
            socket.send(JSON.stringify({ type: "auth", username: callbacks.envVars.username }));

            return () => clearTimeout(timeout);
        }, 1000);

        console.log("WebSocket verbunden");
        callbacks.onOpen();
    };

    socket.onclose = () => {
        Notification("localchat", "Connection closed");
        console.log("WebSocket getrennt");
        callbacks.onClose();
    };

    socket.onmessage = (event: MessageEvent) => {
        callbacks.onMessage(event);
    };

    socket.onerror = (event: Event) => {
        callbacks.onError(event);
    };
};

function closeWebSocket() {
    socket.close();
}

/**
 * Sends a client message to the websocket.
 * @param message - The message to send.
 */
function sendClientMessageToWebsocket(message: string): void {
    console.log("sending message to websocket: " + message);
    socket.send(JSON.stringify({ type: "message", message: message }));
}

export { closeWebSocket, sendClientMessageToWebsocket, socket };
