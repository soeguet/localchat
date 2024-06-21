import { useClientStore } from "../../../stores/clientStore";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";
import { base64ToUtf8 } from "../../../utils/encoder";
import { HelpCallerSvg } from "../../svgs/emergency/HelpCallerSvg";

function EmergencyChat() {
	const emergencyMessages = useEmergencyStore(
		(state) => state.emergencyMessages,
	);
	const clientList = useClientStore((state) => state.clients);
	const myClientId = useUserStore((state) => state.myId);
	return (
		<>
			<div className="h-full w-full grow overflow-auto">
				{emergencyMessages.map((message) => {
					const decodedMessage = base64ToUtf8(message.message);
					const messageSender = clientList.find(
						(client) => client.clientDbId === message.clientDbId,
					);
					if (messageSender === undefined || messageSender === null) {
						throw new Error("messageSender is undefined");
					}
					const messageSenderColor = messageSender.clientColor;

					return (
						<div
							key={message.messageDbId}
							className="flex flex-col gap-1 p-2">
							<div
								className="flex gap-3 font-semibold"
								style={{
									color: messageSenderColor,
								}}>
								{myClientId === message.clientDbId && (
									<HelpCallerSvg />
								)}
								{messageSender.clientUsername}
							</div>
							<div
								className="ml-12 border-l-2 pl-2"
								style={{
									borderColor: messageSenderColor,
								}}>
								{decodedMessage}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export { EmergencyChat };
