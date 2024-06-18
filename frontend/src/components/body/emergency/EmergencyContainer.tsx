import { useRef } from "react";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { EmergencyHeader } from "./EmergencyHeader";
import { EmergencyChat } from "./EmergencyChat";
import { EmergencyInput } from "./EmergencyInput";

function EmergencyContainer() {
	const emergency = useEmergencyStore((state) => state.emergency);
	const chatVisible = useEmergencyStore((state) => state.chatVisible);
	const emergencyContainer = useRef<HTMLDialogElement>(null);

	if (!emergency || !chatVisible) {
		return null;
	}
	return (
		<>
			<dialog
				ref={emergencyContainer}
				data-testid="emergency-container"
				className="top-max bottom-max left-max right-max absolute z-10 flex h-4/5 w-3/5 flex-col items-center justify-center divide-y-2 divide-black rounded-xl border-2 border-b-4 border-r-4 border-black/50 shadow-xl shadow-black/60">
				<EmergencyHeader />
				<EmergencyChat />
				<EmergencyInput />
			</dialog>
		</>
	);
}

export { EmergencyContainer };
