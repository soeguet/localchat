import { getTimeWithHHmmFormat } from "./time";
import { MessagePayload } from "./customTypes";
import { Notification } from "../../wailsjs/go/main/App";
import useUserStore from "../stores/userStore";
import { WindowShow } from "../../wailsjs/runtime";
import React, {Dispatch} from "react";
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
    const id: string | undefined = newMessage.messageType.messageId;
    const userId: string | undefined = newMessage.userType.userId;
    const thisClientId = useUserStore.getState().myId;

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
                await Notification(
                    getTimeWithHHmmFormat(new Date()) + " - " + newMessage.userType.userName,
                    newMessage.messageType.message
                );
                WindowShow();
            }
        }
    }
}
