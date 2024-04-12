import {MessagePayload, PayloadSubType} from "./customTypes";
import {
    checkIfMessageIsToBeAddedToTheUnseenMessagesList,
    checkIfNotificationIsNeeded,
    handeMessageListPayload,
    handleClientListPayload,
} from "../hooks/socket/utils";
import {checkIfScrollToBottomIsNeeded} from "./scrollToBottomNeeded";
import {useDoNotDisturbStore} from "../stores/doNotDisturbStore";
import {Notification} from "../../wailsjs/go/main/App";
import {WindowMinimise, WindowShow, WindowUnminimise,} from "../../wailsjs/runtime";
import {useMessageMapStore} from "../stores/messageMapStore";
import {useUserStore} from "../stores/userStore";
import {useTypingStore} from "../stores/typingStore";
import {notifyClientIfReactionTarget} from "./reactionHandler";
import {retrieveMessageListFromSocket} from "./socket";

export function handleIncomingMessages(event: MessageEvent) {
    const dataAsObject = JSON.parse(event.data);

    switch (dataAsObject.payloadType) {

        // normal chat messages
        // PayloadSubType.message == 1
        case PayloadSubType.message: {
            const messagePayload = JSON.parse(event.data) as MessagePayload;

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

        // update the client list with new data
        // PayloadSubType.clientList == 2
        // PayloadSubType.profileUpdate == 3
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

            // AFTER receiving the client list, ask for the message list
            retrieveMessageListFromSocket();

            break;

        // PayloadSubType.messageList == 4
        case PayloadSubType.messageList:
            handeMessageListPayload(event.data);
            break;

        // PayloadSubType.typing == 5
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

        // PayloadSubType.force == 6
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

        // PayloadSubType.reaction == 7
        case PayloadSubType.reaction:
            // updated message from socket with reactions
            useMessageMapStore.getState().onUpdateMessage(dataAsObject);

            notifyClientIfReactionTarget(dataAsObject as MessagePayload);

            break;

        // unknown payload type
        default:
            throw new Error("Unknown payload type");
    }
}