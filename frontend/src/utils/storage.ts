import { formatTime } from "./time";
import { MessagePayload } from "./customTypes";
import { MakeWindowsTaskIconFlash, Notification } from "./../../wailsjs/go/main/App";
import useUserStore from "../stores/userStore";
import useEnvironmentStore from "../stores/environmentStore";
import { WindowShow } from "../../wailsjs/runtime/runtime";
/**
 * Adds a message to the messages map if it has a unique ID.
 * @param newMessage The new message to be added.
 */
export async function addMessageIfUniqueId(
    messagesMap: Map<string, MessagePayload>,
    setMessagesMap: React.Dispatch<React.SetStateAction<Map<string, MessagePayload>>>,
    newMessage: MessagePayload,
    notificationRequest: boolean
) {
    const id: string | undefined = newMessage.messageType.messageId;
    const userId: string | undefined = newMessage.userType.clientId;
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
                Notification(
                    formatTime(new Date()) + " - " + newMessage.userType.clientUsername,
                    newMessage.messageType.message
                );
                WindowShow();
            }

            // if (useEnvironmentStore.getState().clientOs === "windows") {
            //     MakeWindowsTaskIconFlash("localchat")
            //         .then((bool: void) => {
            //             console.log("flashed window: " + bool);
            //         })
            //         .catch((err: void) => {
            //             console.error("error flashing window: " + err);
            //         });
            // }
        }
    }
}
