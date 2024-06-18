import { useMemo, useState } from "react";
import { MenuDotsSvg } from "../../svgs/emergency/MenuDotsSvg";
import { useTranslation } from "react-i18next";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";

function EmergencyChatMenu() {
	const { t } = useTranslation();
	const [showMenu, setShowMenu] = useState(false);

	// emergency chat only visible for the emergency initiator
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const thisClientId = useUserStore((state) => state.myId);
	const emergencyInitiatorThisClient = useMemo(() => {
		return emergencyInitiatorId === thisClientId;
	}, [emergencyInitiatorId, thisClientId]);

	return (
		<>
			<div className="relative" onClick={() => setShowMenu(!showMenu)}>
				{emergencyInitiatorThisClient && (
					<div className="grow cursor-pointer hover:animate-bounce">
						<MenuDotsSvg />
					</div>
				)}
				{showMenu && (
					<div
						className="text-nowrap absolute right-0 top-12 grow cursor-pointer rounded-xl border border-black bg-white p-3 text-base font-normal text-black shadow-lg shadow-black/30 hover:bg-amber-50"
						onClick={() => {
							useEmergencyStore.getState().setChatVisible(false);
							useEmergencyStore.getState().setEmergency(false);
							setShowMenu(false);
						}}>
						{t("emergency_chat_menu_item_end")}
					</div>
				)}
			</div>
		</>
	);
}

export { EmergencyChatMenu };
