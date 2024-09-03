import { errorLogger } from "../../logger/errorLogger";
import { useMessageMapStore } from "../../stores/messageMapStore";
import {
	MessageListPayloadSchema,
	PayloadSubTypeEnum,
} from "../types/customTypes";

export function messageListHandler(event: MessageEvent) {
	const messageListValidation = MessageListPayloadSchema.safeParse(
		JSON.parse(event.data),
	);

	if (messageListValidation.success) {
		for (const messagePayload of messageListValidation.data.messageList) {
			useMessageMapStore.getState().onMessage({
				...messagePayload,
				payloadType: PayloadSubTypeEnum.enum.message,
			});
		}
	} else {
		console.error("Failed to parse message list payload");
		errorLogger.logError(new Error("Failed to parse message list payload"));
		throw new Error("Failed to parse message list payload");
	}
}