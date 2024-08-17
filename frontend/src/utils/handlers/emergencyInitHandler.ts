import {EmergencyInitPayloadSchema} from "../customTypes";
import {useEmergencyStore} from "../../stores/emergencyStore";
import {errorLogger} from "../../logger/errorLogger";

export function emergencyInitHandler(event: MessageEvent) {

    const emergencyInitValidation = EmergencyInitPayloadSchema.safeParse(JSON.parse(event.data));

    if (emergencyInitValidation.success) {

        const state = useEmergencyStore.getState();
        state .setEmergencyInitiatorId(emergencyInitValidation.data.initiatorClientDbId);
        state.setEmergency(emergencyInitValidation.data.active);
        state.setChatVisible(true);
        state.setEmergencyChatId(emergencyInitValidation.data.emergencyChatId);

        if (!emergencyInitValidation.data.active) {
            state.setEmergencyMessages([]);
        }

    } else {

        console.error("Failed to parse emergency init payload");
        errorLogger.logError(new Error("Failed to parse emergency init payload"));
        throw new Error("Failed to parse emergency init payload");

    }
}