import { Notification } from "../../wailsjs/go/main/App";
import { getClientById } from "../stores/clientStore";
import useReplyStore, { Reply } from "../stores/replyStore";
import useUserStore from "../stores/userStore";
import useWebsocketStore from "../stores/websocketStore";
import { generateSimpleId } from "./functionality";
import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import { getTimeWithHHmmFormat } from "./time";
import {
    AuthenticationPayload,
    CallbackProps,
    MessagePayload,
    PayloadSubType,
} from "./customTypes";
import { utf8ToBase64 } from "./encoder";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    //console.log("Connecting to WebSocket");
    //console.log("useEnvironmentStore.getState().socketIp", useEnvironmentStore.getState().socketIp);
    //console.log("useEnvironmentStore.getState().socketPort", useEnvironmentStore.getState().socketPort);
    socket = new WebSocket(
        `ws://${useUserStore.getState().socketIp}:${useUserStore.getState().socketPort}/chat`
    );

    socket.onopen = async () => {
        if (!useDoNotDisturbStore.getState().doNotDisturb) {
            await Notification("localchat", "Connection opened");
        }

        // register user with the server
        const authPayload: AuthenticationPayload = {
            payloadType: PayloadSubType.auth,
            clientUsername: useUserStore.getState().myUsername,
            clientDbId: useUserStore.getState().myId,
        };

        setTimeout(() => {
            socket.send(JSON.stringify(authPayload));
        }, 1000);

        callbacks.onOpen();
    };

    socket.onclose = async () => {
        if (!useDoNotDisturbStore.getState().doNotDisturb) {
            await Notification("localchat", "Connection closed");
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
    const username = getClientById(id)?.clientUsername;

    if (
        username === null ||
        username === undefined ||
        id === null ||
        username === "" ||
        id === ""
    ) {
        throw new Error("username or id is null" + username + id);
    }

    console.log("message", message);

    const base64EncodedMessage = utf8ToBase64(message);

    const payload: MessagePayload = {
        payloadType: PayloadSubType.message,
        clientType: {
            clientDbId: id,
        },
        messageType: {
            messageContext: base64EncodedMessage,
            messageTime: getTimeWithHHmmFormat(new Date()),
            messageDate: new Date().toDateString(),
            messageDbId: generateSimpleId(),
        },
    };

    // if there is a replyMessage message, add it to the payload
    if (replyMessage) {
        payload.quoteType = {
            quoteDbId: replyMessage.id,
            quoteClientId: replyMessage.senderId,
            quoteMessageContext: replyMessage.message,
            quoteTime: replyMessage.time,
            quoteDate: replyMessage.date,
        };
    }

    //console.log("payload", payload);
    socket.send(JSON.stringify(payload));
}

export { closeWebSocket, sendClientMessageToWebsocket, socket };
