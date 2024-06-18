import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";
import { CloseButton } from "../../svgs/ui/CloseButton";
import { EmergencyChatMenu } from "./EmergencyChatMenu";

function EmergencyHeader() {
	const myColor = useUserStore((state) => state.myColor);
	const headerColor = myColor ? `${myColor}` : "bg-amber-900/80";
	return (
		<>
			<div
				className="relative w-full p-2 font-bold text-white"
				style={{
					backgroundColor: headerColor,
				}}>
				Emergency Chat
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
