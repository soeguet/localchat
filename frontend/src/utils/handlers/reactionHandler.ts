import {useMessageMapStore} from "../../stores/messageMapStore";
import {notifyClientIfReactionTarget} from "../helper/reactionHandler";
import {MessagePayloadSchema} from "../types/customTypes";

export async function reactionHandler(event: MessageEvent) {

    const messagePayloadValidation = MessagePayloadSchema.safeParse(JSON.parse(event.data));

    if (messagePayloadValidation.success) {

        useMessageMapStore.getState().onUpdateMessage(messagePayloadValidation.data);
        await notifyClientIfReactionTarget(messagePayloadValidation.data);

    }
}