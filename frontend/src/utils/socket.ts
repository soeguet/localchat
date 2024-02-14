import { Notification } from "../../wailsjs/go/main/App";
import useEnvVarsStore from "../stores/envVarsStore";
import useReplyStore from "../stores/replyStore";
import { CallbackProps, MessagePayload, PayloadSubType } from "./customTypes";

let socket: WebSocket;

export const initWebSocket = (callbacks: CallbackProps) => {
    if (callbacks.envVars === null) {
        return;
    }
    socket = new WebSocket(`ws://${callbacks.envVars.ip}:${callbacks.envVars.port}`);
    socket.onopen = () => {
        Notification("localchat", "Connection opened");

        fetch(`http://${callbacks.envVars?.ip}:${callbacks.envVars?.port}/register-user`, {
            method: "POST",
            body: JSON.stringify({
                type: "auth",
                username: callbacks.envVars?.username,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // one second timeout to give the socket some breathing room :D
        const timeout = setTimeout(() => {
            socket.send(JSON.stringify({ type: "auth", username: callbacks.envVars?.username }));

            return () => clearTimeout(timeout);
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
    const username = useEnvVarsStore.getState().zustandVar?.username;

    const payload: MessagePayload = {
        type: PayloadSubType.message,
        user: {
            username: username ? username : "unknown",
            isUser: true,
            profilePhoto: "",
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
