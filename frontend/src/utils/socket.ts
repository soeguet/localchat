import { Notification } from "../../wailsjs/go/main/App";
import { getClientById } from "../stores/clientStore";
import useReplyStore, { Reply } from "../stores/replyStore";
import useUserStore from "../stores/userStore";
import useWebsocketStore from "../stores/websocketStore";
import { AuthenticatedPayload, CallbackProps, MessagePayload, PayloadSubType } from "./customTypes";
import { generateSimpleId } from "./functionality";
import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import { getTimeWithHHmmFormat } from "./time";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    //console.log("Connecting to WebSocket");
    //console.log("useEnvironmentStore.getState().socketIp", useEnvironmentStore.getState().socketIp);
    //console.log("useEnvironmentStore.getState().socketPort", useEnvironmentStore.getState().socketPort);
    socket = new WebSocket(
        `ws://${useUserStore.getState().socketIp}:${useUserStore.getState().socketPort}/chat`
    );

    socket.onopen = () => {
        if (!useDoNotDisturbStore.getState().doNotDisturb) {
            Notification("localchat", "Connection opened");
        }

        // register user with the server
        const authPayload: AuthenticatedPayload = {
            payloadType: PayloadSubType.auth,
            clientUsername: useUserStore.getState().myUsername,
            clientId: useUserStore.getState().myId,
        };

        setTimeout(() => {
            socket.send(JSON.stringify(authPayload));
        }, 1000);

        callbacks.onOpen();
    };

    socket.onclose = () => {
        if (!useDoNotDisturbStore.getState().doNotDisturb) {
            Notification("localchat", "Connection closed");
        }
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

function sendClientMessageToWebsocket(message: string): void {
    const replyMessage: Reply | null = useReplyStore.getState().replyMessage;
    const id = useUserStore.getState().myId;
    const username = getClientById(id)?.username;

    if (username === null || username === undefined || id === null || username === "" || id === "") {
        throw new Error("username or id is null" + username + id);
    }

    const payload: MessagePayload = {
        payloadType: PayloadSubType.message,
        userType: {
            clientId: id,
            clientUsername: username,
            clientProfilePhoto: useUserStore.getState().myProfilePhoto,
        },
        messageType: {
            message: message,
            time: getTimeWithHHmmFormat(new Date()),
            messageId: generateSimpleId(),
            messageSenderId: id,
        },
    };

    // if there is a replyMessage message, add it to the payload
    if (replyMessage) {
        payload.quoteType = {
            quoteId: replyMessage.id,
            quoteMessage: replyMessage.message,
            quoteTime: replyMessage.time,
            quoteSenderId: replyMessage.senderId,
        };
    }

    //console.log("payload", payload);
    socket.send(JSON.stringify(payload));
}

export { closeWebSocket, sendClientMessageToWebsocket, socket };
