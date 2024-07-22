import { errorLogger } from "../logger/errorLogger";
import type { EmergencyMessage, EmergencyMessagePayload } from "./customTypes";

export async function preventDuplicateEmergencyMessages(
	emergencyMessageArray: EmergencyMessage[],
	payload: EmergencyMessagePayload,
) {
	// prevent duplicate messages
	for (let i = 0; i < emergencyMessageArray.length; i++) {
		if (emergencyMessageArray[i].messageDbId === payload.messageDbId) {
			errorLogger.logError(new Error("Duplicate emergency message"));
			return 1;
		}
	}
	return 0;
}
