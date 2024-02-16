import { Notification } from "../../wailsjs/go/main/App";
import useEnvVarsStore from "../stores/envVarsStore";
import useReplyStore from "../stores/replyStore";
import userStore from "../stores/userStore";
import { CallbackProps, MessagePayload, PayloadSubType, RegisteredUser } from "./customTypes";

let socket: WebSocket;

type UserFromSocket = {
    id: string;
    user: string;
};

export const initWebSocket = (callbacks: CallbackProps) => {
    if (callbacks.envVars === null) {
        throw new Error("envVars is null - 1");
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
        const timeout = setTimeout(async () => {
            console.log(callbacks.envVars);
            if (callbacks.envVars === null) {
                throw new Error("envVars is null -2 ");
            }
            socket.send(JSON.stringify({ type: "auth", username: callbacks.envVars?.username }));
            console.log("FETCH!");

            await fetch(`http://${callbacks.envVars.ip}:${callbacks.envVars.port}/register-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: callbacks.envVars?.username }),
            })
                .then((response) => response.json())
                .then((data: UserFromSocket[]) => {
                    // override and persist existing list of users
                    const userMap: Map<string, RegisteredUser> = new Map();
                    data.forEach((user) => {
                        const userAsObject:RegisteredUser = JSON.parse(user.user);

                        userMap.set(user.id, userAsObject);

                        if (userAsObject.username === callbacks.envVars?.username) {
                            userStore.getState().setMyId(user.id);
                            userStore.getState().setMyUsername(userAsObject.username);
                            userStore.getState().setMyColor(userAsObject.clientColor);
                            userStore.getState().setMyProfilePhoto(userAsObject.profilePhotoUrl);
                        }
                    });
                    userStore.getState().setUserMap(userMap);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

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
