import { errorLogger } from "../../logger/errorLogger";
import { useMessageMapStore } from "../../stores/messageMapStore";
import { notifyClientIfReactionTarget } from "../helper/reactionHandler";
import { type MessagePayload, MessagePayloadSchema, PayloadSubTypeEnum, UpdatedReactionMessagePayloadSchema } from "../types/customTypes";

export async function reactionHandler(event: MessageEvent) {
	const messagePayloadValidation = UpdatedReactionMessagePayloadSchema.safeParse(
		JSON.parse(event.data),
	);

	if (messagePayloadValidation.success) {
        // TODO change to interface
        const payload: MessagePayload = {
            ...messagePayloadValidation.data,
            payloadType: PayloadSubTypeEnum.enum.message
        }
		useMessageMapStore
			.getState()
			.onUpdateMessage(payload);
		await notifyClientIfReactionTarget(payload);

	} else {

        console.error("Failed to parse reaction payload");
        console.error(JSON.stringify(event.data, null, 2));
        errorLogger.logError("Failed to parse reaction payload");
        errorLogger.logError(JSON.parse(event.data))
		throw new Error("Failed to parse reaction payload");
	}
}
