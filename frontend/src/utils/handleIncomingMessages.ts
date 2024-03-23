import {MessagePayload, PayloadSubType, ReactionPayload} from "./customTypes";
import {
    checkIfMessageIsToBeAddedToTheUnseenMessagesList,
    checkIfNotificationIsNeeded,
    handeMessageListPayload,
    handleClientListPayload,
} from "../hooks/socket/utils";
import { checkIfScrollToBottomIsNeeded } from "./scrollToBottomNeeded";
import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import { Notification } from "../../wailsjs/go/main/App";
import {
    WindowMinimise,
    WindowShow,
    WindowUnminimise,
} from "../../wailsjs/runtime";
import useMessageMapStore from "../stores/messageMapStore";
import useUserStore from "../stores/userStore";
import useTypingStore from "../stores/typingStore";
import {notifyClientIfReactionTarget} from "./reactionHandler";

export function handleIncomingMessages(event: MessageEvent) {
    const dataAsObject = JSON.parse(event.data);
    //
    console.log("dataAsObject", dataAsObject);

    switch (dataAsObject.payloadType) {
        // update the client list with new data
        case PayloadSubType.clientList || PayloadSubType.profileUpdate:
            // console.table(dataAsObject.clients);
            if (
                dataAsObject.clients === undefined ||
                dataAsObject.clients === null ||
                dataAsObject.clients.length === 0
            ) {
                throw new Error("Client list is empty");
            }
            handleClientListPayload(event.data);

            break;

        // normal chat messages
        case PayloadSubType.message: {
            const messagePayload = JSON.parse(event.data) as MessagePayload;
            // const messageSenderName =
            //     getClientById(messagePayload.users.id)?.username || t("unknown_user");
            // console.log("messagePayload", messagePayload);

            useMessageMapStore.getState().onMessage(messagePayload);

            // if scroll to bottom is not needed, add the message to the unseen messages list
            const addIdToList = !checkIfScrollToBottomIsNeeded(
                messagePayload.clientType.clientDbId
            );
            checkIfMessageIsToBeAddedToTheUnseenMessagesList(
                messagePayload,
                addIdToList
            );

            //display the message
            checkIfNotificationIsNeeded(messagePayload);
            break;
        }

        case PayloadSubType.messageList:
            handeMessageListPayload(event.data);
            break;

        case PayloadSubType.typing:
            if (
                dataAsObject.clientDbId === undefined ||
                dataAsObject.isTyping === undefined
            ) {
                throw new Error(
                    "Typing payload is missing client ID or typing status"
                );
            }
            if (dataAsObject.isTyping) {
                useTypingStore
                    .getState()
                    .addTypingClientId(dataAsObject.clientDbId);
            } else {
                useTypingStore
                    .getState()
                    .removeTypingClientId(dataAsObject.clientDbId);
            }
            break;

        case PayloadSubType.force:
            if (dataAsObject.clientDbId === useUserStore.getState().myId) {
                // just to be safe if the client does not want to get notifications!
                if (!useDoNotDisturbStore.getState().doNotDisturb) {
                    Notification("ALARM", "PLEASE CHECK THE CHAT");

                    setTimeout(() => {
                        WindowUnminimise();
                    }, 1000);
                    WindowMinimise();
                    WindowShow();
                }
            }
            break;

        case PayloadSubType.reaction:
            // updated message from socket with reactions
            useMessageMapStore.getState().onUpdateMessage(dataAsObject);

            notifyClientIfReactionTarget(dataAsObject as ReactionPayload);

            break;

        // unknown payload type
        default:
            //console.log("Unknown payload type", dataAsObject);
            throw new Error("Unknown payload type");
    }
}