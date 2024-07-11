import { useEffect, useRef } from "react";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { EmergencyChat } from "./EmergencyChat";
import { EmergencyHeader } from "./EmergencyHeader";
import { EmergencyInput } from "./EmergencyInput";
import { useUserStore } from "../../../stores/userStore";

function EmergencyContainer() {
	const emergency = useEmergencyStore((state) => state.emergency);
	const emergencyContainer = useRef<HTMLDialogElement>(null);
	const emergencyChatVisible = useEmergencyStore((state) => state.chatVisible);

	// this is needed, since anyone who is "not available" should not have a chat popup
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (emergencyContainer == null || emergencyContainer.current === null) {
			return;
		}

		if (useUserStore.getState().availability === false) {
			return;
		}

		emergencyContainer.current.showModal();

		return () => {
			if (emergencyContainer == null || emergencyContainer.current === null) {
				return;
			}
			emergencyContainer.current.close();
		};
	}, [emergency]);

	// this is needed, since everyone who clicks on the button should have a chat popup, even if "not available"
	useEffect(() => {
		if (emergencyContainer == null || emergencyContainer.current === null) {
			return;
		}
		if (emergencyChatVisible) {
			emergencyContainer.current.showModal();
		} else {
			emergencyContainer.current.close();
		}

		return () => {
			if (emergencyContainer == null || emergencyContainer.current === null) {
				return;
			}
			emergencyContainer.current.close();
		};
	}, [emergencyChatVisible]);

	return (
		<>
			{emergency && emergencyChatVisible && (
				<dialog
					ref={emergencyContainer}
					data-testid="emergency-container"
					className="absolute z-10 flex h-5/6 w-4/5 flex-col items-center justify-center divide-y-2 divide-black rounded-xl border-2 border-b-4 border-r-4 border-black/50 shadow-xl shadow-black/60 backdrop:bg-black/60"
				>
					<EmergencyHeader />
					<EmergencyChat />
					<EmergencyInput />
				</dialog>
			)}
		</>
	);
}

export { EmergencyContainer };
