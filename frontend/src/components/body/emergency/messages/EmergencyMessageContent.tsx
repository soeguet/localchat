import { base64ToUtf8 } from "../../../../utils/transformation/encoder";

type EmergencyMessageContentProps = {
	message: string;
	messageSenderColor: string;
	messageFromThisClient: boolean;
};

function EmergencyMessageContent(props: EmergencyMessageContentProps) {
	const decodedMessage = base64ToUtf8(props.message);
	const attributes = props.messageFromThisClient
		? "mr-5 whitespace-pre-wrap border-r-2 pr-3"
		: "ml-5 whitespace-pre-wrap border-l-2 pl-3";
	return (
		<>
			<div
				className={attributes}
				style={{
					borderColor: props.messageSenderColor,
				}}
			>
				{decodedMessage}
			</div>
		</>
	);
}

export { EmergencyMessageContent };