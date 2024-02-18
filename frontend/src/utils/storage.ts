import { formatTime } from "./time";
import { MessagePayload } from "./customTypes";
import { MakeWindowsTaskIconFlash, Notification } from "./../../wailsjs/go/main/App";
import useUserStore from "../stores/userStore";
import useEnvironmentStore from "../stores/environmentStore";

/**
 * Adds a message to the messages map if it has a unique ID.
 * @param newMessage The new message to be added.
 */
export async function addMessageIfUniqueId(
    messagesMap: Map<string, MessagePayload>,
    setMessagesMap: React.Dispatch<React.SetStateAction<Map<string, MessagePayload>>>,
    newMessage: MessagePayload
) {
    const id: string | undefined = newMessage.id;

    if (id === undefined) {
        throw new Error("message has no id!");
    }

    // check if message id is unique
    if (!messagesMap.has(id)) {
        // add to map
        setMessagesMap((prev) => new Map(prev).set(id, newMessage));

        // TODO put this somewhere else
        if (newMessage.user.username !== useUserStore.getState().myUsername) {
            Notification(formatTime(new Date()) + " - " + newMessage.user.username, newMessage.message.message);
            if (useEnvironmentStore.getState().clientOs === "windows") {
                MakeWindowsTaskIconFlash("localchat")
                    .then((bool: void) => {
                        console.log("flashed window: " + bool);
                    })
                    .catch((err: void) => {
                        console.error("error flashing window: " + err);
                    });
            }
        }
    } else {
        throw new Error(`rejected message with id ${id} since it already exists.`);
    }
}
