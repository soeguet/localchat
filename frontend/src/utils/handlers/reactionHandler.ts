import {useMessageMapStore} from "../../stores/messageMapStore";
import {notifyClientIfReactionTarget} from "../reactionHandler";
import {MessagePayloadSchema} from "../customTypes";

export function reactionHandler(event: MessageEvent) {

    const messagePayloadValidation = MessagePayloadSchema.safeParse(JSON.parse(event.data));

    if (messagePayloadValidation.success) {

        useMessageMapStore.getState().onUpdateMessage(messagePayloadValidation.data);
        notifyClientIfReactionTarget(messagePayloadValidation.data);

    }
}