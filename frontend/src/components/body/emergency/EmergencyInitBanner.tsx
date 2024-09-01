import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { DEFAULT_HOVER_COLOR } from "../../../utils/variables/variables";

function EmergencyInitBanner() {
	const { t } = useTranslation();
	const emergencyMessagesCount = useEmergencyStore(
		(state) => state.emergencyMessages.length,
	);
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const emergencyInitiatorColor = useClientStore(
		(state) => state.getClientById(emergencyInitiatorId)?.clientColor,
	);
	const emergencyInitiatorName = useClientStore(
		(state) => state.getClientById(emergencyInitiatorId)?.clientUsername,
	);
	return (
		<>
			{emergencyMessagesCount < 3 && (
				<div
					className="m-1 mt-3 animate-bounce rounded-2xl border-0 p-2 text-center"
					style={{
						backgroundColor:
							emergencyInitiatorColor ?? DEFAULT_HOVER_COLOR,
						opacity: 0.8,
						color: "white",
					}}>
					{t("emergency_chat_init_text", {
						initiatorName: emergencyInitiatorName,
					})}
				</div>
			)}
		</>
	);
}

export { EmergencyInitBanner };