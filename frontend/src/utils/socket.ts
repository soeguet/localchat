import { Notification } from "../../wailsjs/go/main/App";
import useReplyStore from "../stores/replyStore";
import userStore from "../stores/userStore";
import { CallbackProps, MessagePayload, PayloadSubType } from "./customTypes";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    if (callbacks.envVars === null) {
        throw new Error("envVars is null - 1");
    }
    socket = new WebSocket(`ws://${callbacks.envVars.ip}:${callbacks.envVars.port}/chat`);

    socket.onopen = () => {
        Notification("localchat", "Connection opened");
        console.log("socket");

        // register user with the server
        const authPayload = {
            type: PayloadSubType.auth,
            username: callbacks.envVars?.username,
            id: callbacks.envVars?.id,
        };

        socket.send(JSON.stringify(authPayload));

        callbacks.onOpen();
    };

    socket.onclose = () => {
        Notification("localchat", "Connection closed");
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
    const replyTo = useReplyStore.getState().replyTo;

    const payload: MessagePayload = {
        type: PayloadSubType.message,
        user: {
            id: userStore.getState().myId,
            username: userStore.getState().myUsername,
            isUser: true,
            profilePhoto: userStore.getState().myProfilePhoto,
        },
        message: {
            message: message,
            time: new Date().toLocaleTimeString(),
        },
    };

    // if there is a replyTo message, add it to the payload
    if (replyTo) {
        payload.quote = {
            message: replyTo.message,
            time: replyTo.time,
            sender: replyTo.username,
        };
    }

    socket.send(JSON.stringify(payload));
}

export { closeWebSocket, sendClientMessageToWebsocket, socket };
