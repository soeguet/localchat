import { useClientStore } from "../../../../stores/clientStore";
import { useEmergencyStore } from "../../../../stores/emergencyStore";
import { useUserStore } from "../../../../stores/userStore";
import type { EmergencyMessage } from "../../../../utils/customTypes";
import { EmergencyMessageContent } from "./EmergencyMessageContent";
import { EmergencyMessageName } from "./EmergencyMessageName";
import { EmergencyMessageTime } from "./EmergencyMessageTime";

type EmergencyMessageOnPanelProps = {
	message: EmergencyMessage;
};
function EmergencyMessageOnPanel(props: EmergencyMessageOnPanelProps) {
	const clientList = useClientStore((state) => state.clients);
	const messageSender = clientList.find(
		(client) => client.clientDbId === props.message.clientDbId,
	);

	if (messageSender === undefined || messageSender === null) {
		throw new Error("messageSender is undefined");
	}
	const messageSenderColor = messageSender.clientColor
		? messageSender.clientColor
		: "red";

	const myClientId = useUserStore((state) => state.myId);
	const messagFromThisClient = props.message.clientDbId === myClientId;
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);

	const contentSide = messagFromThisClient
		? "justify-end"
		: "flex-row-reverse justify-end";

	return (
		<>
			<div key={props.message.messageDbId} className="flex flex-col gap-1 p-2">
				{/* top part */}
				<EmergencyMessageName
					messageSenderColor={messageSenderColor}
					name={messageSender.clientUsername}
					messageFromThisClient={messagFromThisClient}
					initiator={emergencyInitiatorId === props.message.clientDbId}
				/>
				{/* bottom part */}
				<div className={`flex ${contentSide}`}>
					<EmergencyMessageContent
						message={props.message.message}
						messageSenderColor={messageSenderColor}
						messageFromThisClient={messagFromThisClient}
					/>
					<EmergencyMessageTime
						thisClient={messagFromThisClient}
						time={props.message.time}
					/>
				</div>
			</div>
		</>
	);
}

export { EmergencyMessageOnPanel };
