import {MakeWindowsTaskIconFlash, Notification} from "../../../wailsjs/go/main/App";
import {
    WindowIsMinimised,
    WindowShow,
} from "../../../wailsjs/runtime";
import useChatBottomRefVisibleStore from "../../stores/chatBottomRefVisibleStore";
import useDoNotDisturbStore from "../../stores/doNotDisturbStore";
import useUnseenMessageCountStore from "../../stores/unseenMessageCountStore";
import useUserStore from "../../stores/userStore";
import {ClientListPayload, MessagePayload, PayloadSubType} from "../../utils/customTypes";
import useMessageMapStore from "../../stores/messageMapStore";
import useClientStore, {RegisteredUser} from "../../stores/clientStore";
import useGuiHasFocusStore from "../../stores/guiHasFocusStore";
import {scrollToBottom} from "../../utils/functionality";

export function checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayload: MessagePayload, addIdToList: boolean) {
    // if we don't need to scroll to the bottom, we need to add the message to the unseen messages list

    if (addIdToList) {
        useUnseenMessageCountStore.getState().addMessageToUnseenMessagesList(messagePayload.messageType.messageId);
    } else {
        // console.log("Scroll to bottom is needed");
        useUnseenMessageCountStore.getState().resetUnseenMessageCount();
        scrollToBottom();
        // console.log(useUnseenMessageCountStore.getState().unseenMessageCount);
    }
}

export function checkIfNotificationIsNeeded(messagePayload: MessagePayload) {
    // no message allowed if "do not disturb" is active
    if (useDoNotDisturbStore.getState().doNotDisturb) {
        return;
    }
    // no message needed if message from this client
    if (messagePayload.userType.userId === useUserStore.getState().myId) {
        return;
    }

    // first check if gui is even in focus
    if (useGuiHasFocusStore.getState().guiHasFocus) {
        // no message needed if already at chat bottom
        if (!useChatBottomRefVisibleStore.getState().chatBottomRefVisible) {
            return;
        }
    }

    const messageSenderName = useClientStore
        .getState()
        .clients.find((predicate) => predicate.id === messagePayload.users.id)?.username;

    const titleNotification = messagePayload.messageType.time.slice(0, 5) + " - " + messageSenderName;

    // WindowShow();
    // MakeWindowsTaskIconFlash("localchat");
    WindowIsMinimised()
        .then((isMinimised) => {
            if (isMinimised) {
                MakeWindowsTaskIconFlash("Localchat");
                // setTimeout(() => {
                //     WindowUnminimise();
                // }, 100);
                // setTimeout(() => {
                //     WindowHide();
                // }, 600);
            } else {
                WindowShow();
            }
        })
        .then(() => Notification(titleNotification, messagePayload.messageType.message));

    // WindowIsMinimised().then((isMinimised) => {
    //     if (isMinimised) {
    //         MakeWindowsTaskIconFlash("localchat");
    //     } else {
    //         WindowShow();
    //     }
    // });
}

export function handleClientListPayload(payloadAsString: string) {
    const payloadAsObject: ClientListPayload = JSON.parse(payloadAsString);
    const clients: RegisteredUser[] = payloadAsObject.clients;
    useClientStore.getState().setClients(clients);
}

export function handeMessageListPayload(data: string) {
    console.log("handeMessageListPayload");
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
