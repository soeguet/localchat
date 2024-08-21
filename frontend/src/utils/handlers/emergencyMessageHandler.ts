import {EmergencyMessage, EmergencyMessagePayloadSchema} from "../types/customTypes";
import {useEmergencyStore} from "../../stores/emergencyStore";
import {errorLogger} from "../../logger/errorLogger";
import {preventDuplicateEmergencyMessages} from "../helper/emergencyArrayHelper";
import {useEmergencyNotifications} from "../../components/body/emergency/useEmergencyNotifications";

export async function emergencyMessageHandler(event: MessageEvent) {

    const emergencyMessageValidation = EmergencyMessagePayloadSchema.safeParse(JSON.parse(event.data));

    if (emergencyMessageValidation.success) {

        if (
            useEmergencyStore.getState().emergencyChatId !== emergencyMessageValidation.data.emergencyChatId
        ) {
            errorLogger.logError(new Error("EMERGENCY MESSAGE FROM WRONG CHAT"));
            return;
        }

        const emergencyMessageArray: EmergencyMessage[] = useEmergencyStore.getState().emergencyMessages;

        const result = await preventDuplicateEmergencyMessages(
            emergencyMessageArray,
            emergencyMessageValidation.data,
        );

        if (result === 1) {
            return;
        }

        const emergencyMessage: EmergencyMessage = {
            emergencyChatId: emergencyMessageValidation.data.emergencyChatId,
            messageDbId: emergencyMessageValidation.data.messageDbId,
            message: emergencyMessageValidation.data.message,
            time: emergencyMessageValidation.data.time,
            clientDbId: emergencyMessageValidation.data.clientDbId,
        };
        const newArray = [...emergencyMessageArray, emergencyMessage];
        useEmergencyStore.getState().setEmergencyMessages(newArray);

        useEmergencyNotifications();
    } else {
        console.error("Failed to parse emergency message payload");
        errorLogger.logError(new Error("Failed to parse emergency message payload"));
        throw new Error("Failed to parse emergency message payload");
    }

}