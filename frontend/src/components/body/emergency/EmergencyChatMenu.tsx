import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";
import { useWebsocketStore } from "../../../stores/websocketStore";
import {
	type EmergencyInitPayload,
	PayloadSubTypeEnum,
} from "../../../utils/types/customTypes";
import { MenuDotsSvg } from "../../svgs/emergency/MenuDotsSvg";

function EmergencyChatMenu() {
	const { t } = useTranslation();
	const [showMenu, setShowMenu] = useState(false);

	// emergency chat only visible for the emergency initiator
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const thisClientId = useUserStore((state) => state.myId);
	const emergencyInitiatorThisClient = () => {
		return emergencyInitiatorId === thisClientId;
	};

	function handleEndEmergencyChatModeMenuItemClick() {
		setShowMenu(false);

		const cancelEmergencyChatModePaylad: EmergencyInitPayload = {
			payloadType: PayloadSubTypeEnum.enum.emergencyInit,
			initiatorClientDbId: "",
			active: false,
			emergencyChatId: "",
		};

		const ws = useWebsocketStore.getState().ws;

		if (!ws) {
			throw new Error("ws not initialized");
		}

		ws.send(JSON.stringify(cancelEmergencyChatModePaylad));
	}

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: not yet */}
			<div className="relative" onClick={() => setShowMenu(!showMenu)}>
				{emergencyInitiatorThisClient() && (
					<div className="grow cursor-pointer hover:animate-bounce">
						<MenuDotsSvg />
					</div>
				)}
				{showMenu && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: not yet
					<div
						className="text-nowrap absolute right-0 top-12 z-50 grow cursor-pointer rounded-xl border border-black bg-white p-3 text-base font-normal text-black shadow-lg shadow-black/30 hover:bg-amber-50"
						onClick={handleEndEmergencyChatModeMenuItemClick}
					>
						{t("emergency_chat_menu_item_end")}
					</div>
				)}
			</div>
		</>
	);
}

export { EmergencyChatMenu };