import { useUserStore } from "../../../../../stores/userStore";
import { AvailabilityCrossedSvg } from "../../../../svgs/header/AvailabilityCrossedSvg";
import { AvailabilitySvg } from "../../../../svgs/header/AvailabilitySvg";
import { EmergencyTriggerDiv } from "./EmergencyTriggerDiv";

function AvailabilityMode() {
	const availability = useUserStore((state) => state.availability);
	return (
		<>
			{availability ? (
				<EmergencyTriggerDiv>
					<AvailabilitySvg />
				</EmergencyTriggerDiv>
			) : (
				<EmergencyTriggerDiv>
					<AvailabilityCrossedSvg />
				</EmergencyTriggerDiv>
			)}
		</>
	);
}

export { AvailabilityMode };