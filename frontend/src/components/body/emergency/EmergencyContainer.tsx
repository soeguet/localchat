import { useEffect, useRef } from "react";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { EmergencyChat } from "./EmergencyChat";
import { EmergencyHeader } from "./EmergencyHeader";
import { EmergencyInput } from "./EmergencyInput";

// TODO refactor this into custom hooks
function EmergencyContainer() {
	const emergency = useEmergencyStore((state) => state.emergency);
	const chatVisible = useEmergencyStore((state) => state.chatVisible);
	const emergencyContainer = useRef<HTMLDialogElement>(null);
	const emergencyChatVisible = useEmergencyStore(
		(state) => state.chatVisible,
	);

	useEffect(() => {
		if (emergencyContainer == null || emergencyContainer.current === null) {
			return;
		}
		if (emergencyChatVisible) {
			emergencyContainer.current.showModal();
		} else if (emergencyContainer.current.open) {
			emergencyContainer.current.close();
		}
	}, [emergencyChatVisible]);

	if (!emergency || !chatVisible) {
		return null;
	}
	return (
		<>
			<dialog
				ref={emergencyContainer}
				data-testid="emergency-container"
				className="relative z-10 flex h-5/6 w-4/5 flex-col items-center justify-center divide-y-2 divide-black rounded-xl border-2 border-b-4 border-r-4 border-black/50 shadow-xl shadow-black/60 backdrop:bg-black/60">
				<EmergencyHeader />
				<EmergencyChat />
				<EmergencyInput />
			</dialog>
		</>
	);
}

export { EmergencyContainer };
