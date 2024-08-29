import {useEmergencyStore} from "../../stores/emergencyStore";
import {errorLogger} from "../../logger/errorLogger";
import {AllEmergencyMessagesPayloadSchema, EmergencyMessage} from "../types/customTypes";

export function allEmergencyMessagesHandler(event: MessageEvent) {

    const allEmergencyMessagesValidation = AllEmergencyMessagesPayloadSchema.safeParse(JSON.parse(event.data));

    if (allEmergencyMessagesValidation.success) {
        if (
            useEmergencyStore.getState().emergencyChatId !== allEmergencyMessagesValidation.data.emergencyChatId
        ) {
            errorLogger.logError(
                new Error("EMERGENCY MESSAGE FROM WRONG CHAT"),
            );
            return;
        }

        const currentEmergencyChatId =
            useEmergencyStore.getState().emergencyChatId;

        if (currentEmergencyChatId !== allEmergencyMessagesValidation.data.emergencyChatId) {
            errorLogger.logError(
                new Error("EMERGENCY MESSAGE FROM WRONG CHAT"),
            );
            return;
        }

        if (allEmergencyMessagesValidation.data.emergencyMessages === undefined) {
            throw new Error("Emergency messages are undefined");
        }
        const emergencyMessageArray: EmergencyMessage[] =
            allEmergencyMessagesValidation.data.emergencyMessages;

        useEmergencyStore.getState().setEmergencyMessages(emergencyMessageArray);

    } else {

        console.error("Failed to parse all emergency messages payload");
        errorLogger.logError(new Error("Failed to parse all emergency messages payload"));
        throw new Error("Failed to parse all emergency messages payload");

    }
}