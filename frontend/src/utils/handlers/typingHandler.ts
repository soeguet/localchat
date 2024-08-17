import {TypingPayloadSchema} from "../customTypes";
import {useTypingStore} from "../../stores/typingStore";
import {errorLogger} from "../../logger/errorLogger";

export function typingHandler(event: MessageEvent) {

    const typingValidation = TypingPayloadSchema.safeParse(JSON.parse(event.data));

    if (typingValidation.success) {

        if (typingValidation.data.isTyping) {
            useTypingStore.getState().addTypingClientId(typingValidation.data.clientDbId);
        } else {
            useTypingStore.getState().removeTypingClientId(typingValidation.data.clientDbId);
        }

    } else {

        console.error("Failed to parse typing payload");
        errorLogger.logError(new Error("Failed to parse typing payload"));
        throw new Error("Failed to parse typing payload");

    }
}