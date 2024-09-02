import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";
import { EmergencyLogoSvg } from "../../svgs/emergency/EmergencyLogoSvg";
import { CloseButton } from "../../svgs/ui/CloseButton";
import { EmergencyChatMenu } from "./EmergencyChatMenu";

function EmergencyHeader() {
	const { t } = useTranslation();
	const myColor = useUserStore((state) => state.myColor);
	const headerColor = myColor ? `${myColor}` : "bg-amber-900/80";
	const initiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const initiatorName = useClientStore(
		(state) => state.getClientFromMapById(initiatorId)?.clientUsername,
	);

	return (
		<>
			<div
				className="relative flex w-full cursor-default select-none items-center gap-2 p-2 font-bold text-white"
				style={{
					backgroundColor: headerColor,
				}}>
				<EmergencyLogoSvg />
				{t("emergency_chat_header_text", {
					initiatorName: initiatorName,
				})}
				<div className="absolute right-0.5 top-0.5 flex items-center gap-3">
					<EmergencyChatMenu />
					<div
						className="cursor-pointer hover:animate-spin"
						onClick={() => {
							useEmergencyStore.getState().setChatVisible(false);
						}}>
						<CloseButton />
					</div>
				</div>
			</div>
		</>
	);
}

export { EmergencyHeader };