import { Notification } from "../../wailsjs/go/main/App";
import { getClientById } from "../stores/clientsStore";
import useEnvironmentStore from "../stores/environmentStore";
import useReplyStore from "../stores/replyStore";
import useUserStore from "../stores/userStore";
import useWebsocketStore from "../stores/websocketStore";
import { CallbackProps, MessagePayload, PayloadSubType, AuthenticatedPayload } from "./customTypes";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    socket = new WebSocket(
        `ws://${useEnvironmentStore.getState().socketIp}:${useEnvironmentStore.getState().socketPort}/chat`
    );

    socket.onopen = () => {
        Notification("localchat", "Connection opened");

        // register user with the server
        const authPayload: AuthenticatedPayload = {
            type: PayloadSubType.auth,
            username: useUserStore.getState().myUsername,
            clientId: useUserStore.getState().myId,
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
    const replyMessage = useReplyStore.getState().replyMessage;
    const id = useUserStore.getState().myId;
    const username = getClientById(id)?.username;

    if (username === null || username === undefined || id === null || username === "" || id === "") {
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

    // if there is a replyMessage message, add it to the payload
    if (replyMessage) {
        payload.quote = {
            message: replyMessage.message,
            time: replyMessage.time,
            sender: replyMessage.username,
        };
    }

    socket.send(JSON.stringify(payload));
}

export { closeWebSocket, sendClientMessageToWebsocket, socket };
