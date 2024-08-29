import {useMessageMapStore} from "../../stores/messageMapStore";
import {errorLogger} from "../../logger/errorLogger";
import {MessagePayloadSchema} from "../types/customTypes";

export function modifyMessageHandler(event: MessageEvent) {

    const messagePayloadValidation = MessagePayloadSchema.safeParse(JSON.parse(event.data));

    if (messagePayloadValidation.success) {

        useMessageMapStore.getState().onUpdateMessage(messagePayloadValidation.data);

    } else {

        console.error("Failed to parse message payload");
        errorLogger.logError(new Error("Failed to parse message payload"));
        throw new Error("Failed to parse message payload");

    }
}