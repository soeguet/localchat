import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useUserStore } from "../../../stores/userStore";
import { base64ToUtf8 } from "../../../utils/encoder";
import { HelpCallerSvg } from "../../svgs/emergency/HelpCallerSvg";
import { useEffect, useRef } from "react";
import type { EmergencyMessage } from "../../../utils/customTypes";

function EmergencyChat() {
	const { t } = useTranslation();
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const emergencyMessages = useEmergencyStore(
		(state) => state.emergencyMessages,
	);
	const clientList = useClientStore((state) => state.clients);
	const myClientId = useUserStore((state) => state.myId);
	const emergencyInitiatorId = useEmergencyStore(
		(state) => state.emergencyInitiatorId,
	);
	const emergencyInitiatorColor = useClientStore(
		(state) =>
			state.clients.find(
				(client) => client.clientDbId === emergencyInitiatorId,
			)?.clientColor,
	);
	const emergencyInitiatorName = useClientStore(
		(state) =>
			state.clients.find(
				(client) => client.clientDbId === emergencyInitiatorId,
			)?.clientUsername,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const container = chatContainerRef.current;
		if (container === null) {
			return;
		}
		container.scrollTop = container.scrollHeight;
	}, [emergencyMessages]);

	function messageTemplate(
		messagFromThisClient: boolean,
		message: EmergencyMessage,
		messageSenderColor: string,
		decodedMessage: string,
		clientUsername: string,
	) {
		if (!messagFromThisClient) {
			return (
				<>
					<div
						className="flex gap-3 font-semibold"
						style={{
							color: messageSenderColor,
						}}>
						{emergencyInitiatorId === message.clientDbId && (
							<HelpCallerSvg />
						)}
						{clientUsername}
					</div>
					<div className="flex">
						<div className="ml-3 flex items-center text-xl text-gray-400">
							{message.time}
						</div>
						<div
							className="ml-5 border-l-2 pl-3"
							style={{
								borderColor: messageSenderColor,
							}}>
							{decodedMessage}
						</div>
					</div>
				</>
			);
		}

		return (
			<>
				<div
					className="flex justify-end gap-3 font-semibold"
					style={{
						color: messageSenderColor,
					}}>
					{emergencyInitiatorId === message.clientDbId && (
						<HelpCallerSvg />
					)}
					{clientUsername}
				</div>
				<div className="flex justify-end">
					<div
						className="mr-5 border-r-2 pr-3"
						style={{
							borderColor: messageSenderColor,
						}}>
						{decodedMessage}
					</div>
					<div className="mr-3 flex items-center text-xl text-gray-400">
						{message.time}
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				ref={chatContainerRef}
				className="w-full overflow-y-scroll border-0 px-3">
				<div
					className="m-1 mt-3 animate-bounce rounded-2xl border-0 p-2 text-center"
					style={{
						backgroundColor: emergencyInitiatorColor,
						opacity: 0.8,
						color: "white",
					}}>
					{t("emergency_chat_init_text", {
						initiatorName: emergencyInitiatorName,
					})}
				</div>
				{emergencyMessages.map((message) => {
					const decodedMessage = base64ToUtf8(message.message);
					const messageSender = clientList.find(
						(client) => client.clientDbId === message.clientDbId,
					);
					if (messageSender === undefined || messageSender === null) {
						throw new Error("messageSender is undefined");
					}
					const messageSenderColor = messageSender.clientColor
						? messageSender.clientColor
						: "red";
					const messagFromThisClient =
						message.clientDbId === myClientId;

					return (
						<div
							key={message.messageDbId}
							className="flex flex-col gap-1 p-2">
							{messageTemplate(
								messagFromThisClient,
								message,
								messageSenderColor,
								decodedMessage,
								messageSender.clientUsername,
							)}
							{/* <div className="flex"> */}
							{/* 	<div className="ml-3 flex items-center text-xl text-gray-400"> */}
							{/* 		{message.time} */}
							{/* 	</div> */}
							{/* 	<div */}
							{/* 		className="ml-5 border-l-2 pl-3" */}
							{/* 		style={{ */}
							{/* 			borderColor: messageSenderColor, */}
							{/* 		}}> */}
							{/* 		{decodedMessage} */}
							{/* 	</div> */}
							{/* </div> */}
						</div>
					);
				})}
			</div>
		</>
	);
}

export { EmergencyChat };
