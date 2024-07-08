import { useState } from "react";
import { useEmergencyStore } from "../../../../stores/emergencyStore";
import { EmergencyValidationPopup } from "./EmergencyValidationPopup";

type EmergencyTriggerDivProps = {
	children: React.ReactNode;
};
function EmergencyTriggerDiv(props: EmergencyTriggerDivProps) {
	const [emergencyValidationVisible, setEmergencyValidationVisible] =
		useState(false);
	const emergency = useEmergencyStore((state) => state.emergency);
	return (
		<>
			<div
				className={`relative cursor-pointer  ${emergency && "animate-pulse"}`}
				onClick={() => {
					if (emergency) {
						useEmergencyStore.getState().setChatVisible(true);
						return;
					}
					setEmergencyValidationVisible(!emergencyValidationVisible);
				}}
			>
				{props.children}

				<EmergencyValidationPopup
					isOpen={emergencyValidationVisible}
					setIsOpen={setEmergencyValidationVisible}
				/>
			</div>
		</>
	);
}

export { EmergencyTriggerDiv };
