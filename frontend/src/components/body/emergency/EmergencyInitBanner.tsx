import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import { useEmergencyStore } from "../../../stores/emergencyStore";

function EmergencyInitBanner() {
	const { t } = useTranslation();
	const emergencyMessagesCount = useEmergencyStore(
		(state) => state.emergencyMessages.length,
	);
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const emergencyInitiatorColor = useClientStore(
		(state) =>
			state.clients.find((client) => client.clientDbId === emergencyInitiatorId)
				?.clientColor,
	);
	const emergencyInitiatorName = useClientStore(
		(state) =>
			state.clients.find((client) => client.clientDbId === emergencyInitiatorId)
				?.clientUsername,
	);
	return (
		<>
			{emergencyMessagesCount < 3 && (
				<div
					className="m-1 mt-3 animate-bounce rounded-2xl border-0 p-2 text-center"
					style={{
						backgroundColor: emergencyInitiatorColor ?? "#000000",
						opacity: 0.8,
						color: "white",
					}}
				>
					{t("emergency_chat_init_text", {
						initiatorName: emergencyInitiatorName,
					})}
				</div>
			)}
		</>
	);
}

export { EmergencyInitBanner };