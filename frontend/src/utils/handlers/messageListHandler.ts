import {MessageListPayloadSchema, PayloadSubTypeEnum} from "../customTypes";
import {useMessageMapStore} from "../../stores/messageMapStore";
import {errorLogger} from "../../logger/errorLogger";

export function messageListHandler(event: MessageEvent) {
    const messageListValidation = MessageListPayloadSchema.safeParse(JSON.parse(event.data));

    if (messageListValidation.success) {

        messageListValidation.data.messageList.forEach((messagePayload) => {
            useMessageMapStore.getState().onMessage({
                ...messagePayload,
                payloadType: PayloadSubTypeEnum.enum.message,
            });
        });

    } else {
        console.log(JSON.stringify(event.data, null, 2));

        console.error("Failed to parse message list payload");
        errorLogger.logError(new Error("Failed to parse message list payload"));
        throw new Error("Failed to parse message list payload");

    }
}