import {MessagePayloadSchema} from "../customTypes";
import {useMessageMapStore} from "../../stores/messageMapStore";
import {checkIfScrollToBottomIsNeeded} from "../scrollToBottomNeeded";
import {checkIfMessageIsToBeAddedToTheUnseenMessagesList, checkIfNotificationIsNeeded} from "../../hooks/socket/utils";
import {errorLogger} from "../../logger/errorLogger";

export async function messageHandler(event: MessageEvent) {

    const messagePayloadValidation = MessagePayloadSchema.safeParse(JSON.parse(event.data));

    if (messagePayloadValidation.success) {

        useMessageMapStore.getState().onMessage(messagePayloadValidation.data);

        // if scroll to bottom is unnecessary, add the message to the unseen messages list
        const addIdToList = await checkIfScrollToBottomIsNeeded(messagePayloadValidation.data.clientType.clientDbId);
        await checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayloadValidation.data, !addIdToList);

        //display the message
        await checkIfNotificationIsNeeded(messagePayloadValidation.data);

    } else {

        console.error("Failed to parse message payload");
        errorLogger.logError(new Error("Failed to parse message payload"));
        throw new Error("Failed to parse message payload");

    }
}