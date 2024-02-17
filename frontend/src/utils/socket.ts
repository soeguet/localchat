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

        // just to be safe for now
        if (callbacks.envVars === null) {
            throw new Error("envVars is null");
        }
        if (callbacks.envVars.username === null || callbacks.envVars.id === null) {
            throw new Error("username or id is null");
        }
        if (callbacks.envVars.username === "" || callbacks.envVars.id === "") {
            throw new Error("username or id is empty");
        }

        // register user with the server
        const authPayload = {
            type: PayloadSubType.auth,
            username: callbacks.envVars?.username,
            id: callbacks.envVars?.id,
        };

        setTimeout(() => {
            socket.send(JSON.stringify(authPayload));
        }, 1000);

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
    const username = userStore.getState().myUsername;
    const id = userStore.getState().myId;

    console.log("username", username);
    console.log("id", id);

    if (username === null || id === null || username === "" || id === "") {
        throw new Error("username or id is null" + username + id);
    }

    const payload: MessagePayload = {
        type: PayloadSubType.message,
        user: {
            id: id,
            username: username,
            isUser: true,
            profilePhoto: userStore.getState().myProfilePhoto,
        },
        message: {
            message: message,
            time: new Date().toLocaleTimeString(),
        },
    };
    console.log("payload", payload);

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
