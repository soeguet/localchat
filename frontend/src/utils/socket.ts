import { Notification } from "../../wailsjs/go/main/App";
import { getClientUsername, getSocketIp, getSocketPort } from "./envVariables";
import { addMessageIfUniqueId } from "./storage";
import { MessageBackToClients } from "./types";

type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event) => void;
    onError: (event) => void;
};

let socket: WebSocket;

function initWebSocket(callbacks: CallbackProps) {
    socket = new WebSocket(`ws://${getSocketIp()}:${getSocketPort()}`);

    socket.onopen = () => {
        Notification("localchat", "Connection opened");
        socket.send(
            JSON.stringify({ type: "auth", username: getClientUsername() })
        );
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

    socket.onerror = (event) => {
        callbacks.onError(event);
    };

    // Fügen Sie hier weitere EventListener hinzu, z.B. für `onmessage`
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

export { initWebSocket, closeWebSocket, sendClientMessageToWebsocket };
