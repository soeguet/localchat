import { formatTime } from "./time";
import { UserType, MessageType, MessageBackToClients } from "./types";
import { MakeWindowsTaskIconFlash, Notification } from "./../../wailsjs/go/main/App";
import { getClientOs, getClientUsername } from "./envVariables";

/**
 * Adds a message to the messages map if it has a unique ID.
 * @param newMessage The new message to be added.
 */
export async function addMessageIfUniqueId(
    messagesMap: Map<string, UserType & MessageType>,
    setMessagesMap: React.Dispatch<
        React.SetStateAction<Map<string, UserType & MessageType>>
    >,
    newMessage: MessageBackToClients
) {
    const { id } = newMessage;

    if (!messagesMap.has(id)) {
        /**
         * Represents a new entry in the map.
         */
        const newMapEntry = {
            name: newMessage.sender,
            isUser: newMessage.sender === getClientUsername(),
            profilePhoto: "",
            message: newMessage.message,
            time: formatTime(new Date()),
        };
        setMessagesMap((prev) => new Map(prev).set(newMessage.id, newMapEntry));

        // TODO put this somewhere else
        if (newMessage.sender !== getClientUsername()) {
            Notification(newMessage.sender, newMessage.message);
            if (getClientOs() === "windows") {
                MakeWindowsTaskIconFlash("localchat")
                    .then((bool: any) => {
                        console.log("flashed window: " + bool);
                    })
                    .catch((err: any) => {
                        console.error("error flashing window: " + err);
                    });
            }
        }

        console.log(`added message with id ${id} to map.`);
    } else {
        console.log(`rejected message with id ${id}since it already exists.`);
    }
}
