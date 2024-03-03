import { MakeWindowsTaskIconFlash, Notification } from "../../../wailsjs/go/main/App";
import { WindowIsMinimised, WindowShow } from "../../../wailsjs/runtime/runtime";
import useChatBottomRefVisibleStore from "../../stores/chatBottomRefVisibleStore";
import useDoNotDisturbStore from "../../stores/doNotDisturbStore";
import useUnseenMessageCountStore from "../../stores/unseenMessageCountStore";
import useUserStore from "../../stores/userStore";
import { ClientListPayload, MessagePayload, PayloadSubType } from "../../utils/customTypes";
import { checkIfScrollToBottomIsNeeded } from "../../utils/scrollToBottomNeeded";
import useMessageMapStore from "../../stores/messageMapStore";
import useClientsStore, { RegisteredUser } from "../../stores/clientsStore";

export function checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayload: MessagePayload) {
    // if we don't need to scroll to the bottom, we need to add the message to the unseen messages list
    const addIdToList = !checkIfScrollToBottomIsNeeded();

    if (addIdToList) {
        useUnseenMessageCountStore.getState().addMessageToUnseenMessagesList(messagePayload.messageType.messageId);
    } else {
        console.log("Scroll to bottom is needed");
        useUnseenMessageCountStore.getState().resetUnseenMessageCount();
        console.log(useUnseenMessageCountStore.getState().unseenMessageCount);
    }
}

export function checkIfNotificationIsNeeded(messagePayload: MessagePayload, messageSenderName: string) {
    // no message allowed if "do not disturb" is active
    if (useDoNotDisturbStore.getState().doNotDisturb) {
        return;
    }
    // no message needed if message from this client
    if (messagePayload.userType.clientId === useUserStore.getState().myId) {
        return;
    }
    // no message needed if already at chat bottom
    if (useChatBottomRefVisibleStore.getState().chatBottomRefVisible) {
        return;
    }

    const titleNotification = messagePayload.messageType.time.slice(0, 5) + " - " + messageSenderName;
    Notification(titleNotification, messagePayload.messageType.message).then(() => {
        WindowIsMinimised().then((isMinimised) => {
            if (isMinimised) {
                MakeWindowsTaskIconFlash("localchat");
            } else {
                WindowShow();
            }
        });
    });
}

export function handleClientListPayload(payloadAsString: string) {
    const payloadAsObject: ClientListPayload = JSON.parse(payloadAsString);
    const clients: RegisteredUser[] = payloadAsObject.clients;
    useClientsStore.getState().setClients(clients);
}

export function handeMessageListPayload(data: string) {
    const messageListPayload = JSON.parse(data) as {
        payloadType: PayloadSubType.messageList;
        messageList: MessagePayload[];
    };

    if (messageListPayload.messageList === undefined || messageListPayload.messageList === null) {
        throw new Error("messageListPayload.payload is empty");
    }

    messageListPayload.messageList.forEach((messagePayload) => {
        useMessageMapStore.getState().onMessage(messagePayload);
    });
}
