import {getTimeWithHHmmFormat} from "./time";
import type {MessagePayload} from "./customTypes";
import {Notification} from "../../wailsjs/go/main/App";
import {useUserStore} from "../stores/userStore";
import {WindowShow} from "../../wailsjs/runtime";
import type React from "react";
import type {Dispatch} from "react";
import {useClientStore} from "../stores/clientStore";
import {base64ToUtf8} from "./encoder";

/**
 * Adds a message to the message map if it has a unique ID.
 * @param messagesMap
 * @param setMessagesMap
 * @param newMessage The new message to be added.
 * @param notificationRequest
 */
export async function addMessageIfUniqueId(
    messagesMap: Map<string, MessagePayload>,
    setMessagesMap: Dispatch<React.SetStateAction<Map<string, MessagePayload>>>,
    newMessage: MessagePayload,
    notificationRequest: boolean
) {
    const id: string | undefined = newMessage.messageType.messageDbId;
    const userId: string | undefined = newMessage.clientType.clientDbId;
    const thisClientId = useUserStore.getState().myId;
    const username =
        useClientStore
            .getState()
            .clients.find((predicate) => predicate.clientDbId === userId)
            ?.clientUsername || "Unknown";

    if (id === undefined) {
        throw new Error("message has no id!");
    }

    // check if message id is unique
    if (!messagesMap.has(id)) {
        // add to map
        setMessagesMap((prev) => new Map(prev).set(id, newMessage));

        // TODO put this somewhere else
        if (userId !== thisClientId) {
            if (notificationRequest) {

                const message = base64ToUtf8(newMessage.messageType.messageContext);

                await Notification(
                    getTimeWithHHmmFormat(new Date()) + " - " + username,
                    message
                );
                WindowShow();
            }
        }
    }
}