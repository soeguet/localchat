import { useEmergencyStore } from "../../../stores/emergencyStore";

function EmergencyContainer() {
	const emergency = useEmergencyStore((state) => state.emergency);

	if (!emergency) {
		return null;
	}
	return (
		<>
			<dialog
				data-testid="emergency-container"
				onClick={() => {
					useEmergencyStore.getState().setEmergency(false);
				}}
				className="absolute bg-red-500 w-3/5 h-4/5 top-max bottom-max left-max right-max z-10 flex items-center justify-center">
				EMERGENCY CONTAINER
			</dialog>
		</>
	);
}

export { EmergencyContainer };
