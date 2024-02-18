import { Notification } from "../../wailsjs/go/main/App";
import useEnvironmentStore from "../stores/environmentStore";
import useReplyStore from "../stores/replyStore";
import useUserStore from "../stores/userStore";
import useWebsocketStore from "../stores/websocketStore";
import { CallbackProps, MessagePayload, PayloadSubType } from "./customTypes";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    socket = new WebSocket(
        `ws://${useEnvironmentStore.getState().socketIp}:${useEnvironmentStore.getState().socketPort}/chat`
    );

    socket.onopen = () => {
        Notification("localchat", "Connection opened");

        // register user with the server
        const authPayload = {
            type: PayloadSubType.auth,
            username: useUserStore.getState().myUsername,
            id: useUserStore.getState().myId,
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

    useWebsocketStore.getState().setWs(socket);
};

function closeWebSocket() {
    socket.close();
    useWebsocketStore.getState().setWs(null);
}

/**
 * Sends a client message to the websocket.
 * @param message - The message to send.
 */
function sendClientMessageToWebsocket(message: string): void {
    const replyTo = useReplyStore.getState().replyTo;
    const username = useUserStore.getState().myUsername;
    const id = useUserStore.getState().myId;

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
            profilePhoto: useUserStore.getState().myProfilePhoto,
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
