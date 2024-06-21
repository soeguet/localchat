import { useEmergencyStore } from "../../../stores/emergencyStore";
import { base64ToUtf8 } from "../../../utils/encoder";

function EmergencyChat() {
	const emergencyMessages = useEmergencyStore(
		(state) => state.emergencyMessages,
	);
	return (
		<>
			<div className="h-full w-full grow">
				{emergencyMessages.map((message) => {
					const decodedMessage = base64ToUtf8(message.message);

					return (
						<div key={message.messageDbId}>{decodedMessage}</div>
					);
				})}
			</div>
		</>
	);
}

export { EmergencyChat };
