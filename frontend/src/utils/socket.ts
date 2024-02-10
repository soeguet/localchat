import { Notification } from "../../wailsjs/go/main/App";
import { getClientUsername, getSocketIp, getSocketPort } from "./envVariables";
import { addMessageIfUniqueId } from "./storage";
import { MessageBackToClients } from "./types";

type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent<any>) => void;
    onError: (event: Event) => void;
};

let socket: WebSocket;

function initWebSocket(callbacks: CallbackProps) {
    socket = new WebSocket(`ws://${getSocketIp()}:${getSocketPort()}`);
    socket.onopen = () => {
        Notification("localchat", "Connection opened");

        // one second timeout to give the socket some breathing room :D
        const timeout = setTimeout(() => {
            socket.send(
                JSON.stringify({ type: "auth", username: getClientUsername() })
            );

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

    socket.onmessage = (event) => {
        callbacks.onMessage(event);
    };

    socket.onerror = (event: Event) => {
        callbacks.onError(event);
    };
}

function closeWebSocket() {
    socket.close();
}

/**
 * Sends a client message to the websocket.
 * @param message - The message to send.
 */
function sendClientMessageToWebsocket(message: string): void {
    console.log("sending message to websocket" + message);
    socket.send(JSON.stringify({ type: "message", message: message }));
}

export { initWebSocket, closeWebSocket, sendClientMessageToWebsocket, socket };
