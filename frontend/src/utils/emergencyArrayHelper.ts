import type { EmergencyMessage, EmergencyMessagePayload } from "./customTypes";

export async function preventDuplicateEmergencyMessages(
	emergencyMessageArray: EmergencyMessage[],
	payload: EmergencyMessagePayload,
) {
	// prevent duplicate messages
	for (let i = 0; i < emergencyMessageArray.length; i++) {
		if (emergencyMessageArray[i].messageDbId === payload.messageDbId) {
			// console.error("DUPLICATE EMERGENCY MESSAGE", payload);
			return 1;
		}
	}
	return 0;
}
