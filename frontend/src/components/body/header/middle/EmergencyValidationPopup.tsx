import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../../stores/userStore";
import {
	type EmergencyInitPayload,
	PayloadSubType,
} from "../../../../utils/customTypes";
import { generateSimpleId } from "../../../../utils/functionality";
import { useWebsocketStore } from "../../../../stores/websocketStore";

type EmergencyValidationPopupProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};
function EmergencyValidationPopup(props: EmergencyValidationPopupProps) {
	const { t } = useTranslation();
	function handleEmergencyChatStart() {
		props.setIsOpen(!props.isOpen);
		const ws = useWebsocketStore.getState().ws;

		if (ws === null) {
			throw new Error("Websocket connection is not available");
		}

		const payload: EmergencyInitPayload = {
			payloadType: PayloadSubType.emergencyInit,
			active: true,
			emergencyChatId: generateSimpleId(),
			initiatorClientDbId: useUserStore.getState().myId,
		};

		ws.send(JSON.stringify(payload));
	}
	return (
		<>
			{props.isOpen && (
				<div className="fixed left-1/2 top-[5rem] z-50 -translate-x-1/2 overflow-hidden shadow-lg shadow-black/50 transition duration-300 ease-in-out">
					<div className="size-full items-center justify-center gap-3 rounded-md border border-black bg-white p-2 text-white">
						<div className="text-nowrap p-2 text-black">
							{t("emergency_validation_text")}
						</div>
						<div className="m-2 flex gap-5">
							<button
								type="button"
								className="w-full cursor-pointer rounded-full border border-b-4 border-gray-600/50 bg-green-300 p-1 text-center text-lg font-semibold text-gray-800 hover:bg-green-300/50"
								onClick={handleEmergencyChatStart}>
								{t("emergency_validation_button_start")}
							</button>
							<button
								type="button"
								className="w-full cursor-pointer rounded-full border border-b-4 border-gray-600/50 bg-gray-300/50 p-1 text-center text-lg font-semibold text-gray-800 hover:bg-gray-100/50"
								onClick={() => {
									props.setIsOpen(!props.isOpen);
								}}>
								{t("profile_menu_cancel_button")}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export { EmergencyValidationPopup };
