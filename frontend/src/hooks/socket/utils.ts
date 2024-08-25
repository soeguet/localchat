import {MakeWindowsTaskIconFlash, Notification,} from "../../../wailsjs/go/main/App";
import {WindowIsMinimised, WindowShow} from "../../../wailsjs/runtime";
import {useRefStore} from "../../stores/refStore";
import {useDoNotDisturbStore} from "../../stores/doNotDisturbStore";
import {useUnseenMessageCountStore} from "../../stores/unseenMessageCountStore";
import {useUserStore} from "../../stores/userStore";
import {
    ClientEntity,
    ClientListPayload,
    ClientListPayloadEnhanced,
    MessagePayload,
} from "../../utils/types/customTypes";
import {useClientStore} from "../../stores/clientStore";
import {useGuiHasFocusStore} from "../../stores/guiHasFocusStore";
import {base64ToUtf8} from "../../utils/transformation/encoder";
import {useVersionStore} from "../../stores/versionStore";
import {scrollToBottom} from "../../utils/gui/scrollToBottomNeeded";

export async function checkIfMessageIsToBeAddedToTheUnseenMessagesList(
    messagePayload: MessagePayload,
    addIdToList: boolean,
) {
    // if we don't need to scroll to the bottom, we need to add the message to the unseen messages list

    if (addIdToList) {

        useUnseenMessageCountStore
            .getState()
            .addMessageToUnseenMessagesList(messagePayload.messageType.messageDbId);

    } else {

        useUnseenMessageCountStore.getState().resetUnseenMessageCount();
        await scrollToBottom();

    }
}

export async function checkIfNotificationIsNeeded(messagePayload: MessagePayload) {

    // no message allowed if "do not disturb" is active
    if (useDoNotDisturbStore.getState().doNotDisturb) {
        return;
    }

    // no message needed if message from this client
    if (messagePayload.clientType.clientDbId === useUserStore.getState().myId) {
        return;
    }

    // first check if gui is even in focus
    if (useGuiHasFocusStore.getState().guiHasFocus) {
        // no message needed if already at chat bottom
        if (!useRefStore.getState().chatBottomRefVisible) {
            return;
        }
    }

    const messageSenderName = useClientStore
        .getState()
        .clients.find(
            (predicate) =>
                predicate.clientDbId === messagePayload.clientType.clientDbId,
        )?.clientUsername;

    const titleNotification = `${messagePayload.messageType.messageTime.slice(0, 5)} - ${messageSenderName}`;

    WindowIsMinimised()
        .then((isMinimised) => {
            if (isMinimised) {
                MakeWindowsTaskIconFlash("Localchat");
            } else {
                WindowShow();
            }
        })
        .then(async () => {
            const message = base64ToUtf8(messagePayload.messageType.messageContext);
            await Notification(titleNotification, message);
        });
}

// updates all clients and caches array of clients
// uses clientStore
export function handleClientListPayload(clientListPayload: ClientListPayloadEnhanced) {
    const newVersion = clientListPayload.version;
    useVersionStore.getState().checkForUpdate(newVersion);
    useClientStore.getState().setClients(clientListPayload.clients);
}

// updates this specific client and caches its values
// uses userStore
export function updateThisClientsCachedDataWithNewPayloadData(payload: ClientListPayload) {

    const clients: ClientEntity[] = payload.clients;
    const myId = useUserStore.getState().myId;
    const myClient = clients.find((client) => client.clientDbId === myId);

    if (myClient === undefined) {
        throw new Error("Client not found in client list");
    }

    useUserStore.getState().setMyUsername(myClient.clientUsername);
    useUserStore.getState().setAvailability(myClient.availability);

    if (myClient.clientColor) {
        useUserStore.getState().setMyColor(myClient.clientColor);
    }

    // TODO profile picture 
    if (myClient.clientProfileImage) {

        console.log("profile picture from list is: ", myClient.clientProfileImage);

        useUserStore.getState().setMyProfilePhoto(myClient.clientProfileImage);
    }
}
