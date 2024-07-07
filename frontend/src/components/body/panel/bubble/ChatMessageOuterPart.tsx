import { useState } from "react";
import { useClientStore } from "../../../../stores/clientStore";
import { useReplyStore } from "../../../../stores/replyStore";
import type { MessagePayload } from "../../../../utils/customTypes";
import { ProfilePicture } from "../../../reuseable/ProfilePicture";
import { ChatBubbleMenu } from "./ChatBubbleMenu";
import { BubbleMessageMenuSvg } from "../../../svgs/bubble/BubbleMessageMenuSvg";
type ChatMessageOuterPartProps = {
	messagePayload: MessagePayload;
	lastMessageFromThisClientId: boolean;
	thisMessageFromThisClient: boolean;
	lastMessageTimestampSameAsThisOne: boolean;
	setEnableMessageEditingMode: (enable: boolean) => void;
};

function ChatMessageOuterPart(props: ChatMessageOuterPartProps) {
	const [showMenu, setShowMenu] = useState(false);
	const menuAlignment = props.thisMessageFromThisClient
		? "left-0"
		: "right-0";
	const menuTopMargin = determineTopMarginForMessageMenu();
	const clientColor = useClientStore(
		(state) =>
			state.clients.find(
				(c) =>
					c.clientDbId === props.messagePayload.clientType.clientDbId,
			)?.clientColor,
	);

	function determineTopMarginForMessageMenu() {
		if (!props.lastMessageTimestampSameAsThisOne) {
			return "top-6";
		}
		if (props.messagePayload.messageType.edited) {
			return "top-6";
		}

		return "top-1";
	}

	function activateReplyMessage() {
		useReplyStore.getState().setReplyMessage({
			id: props.messagePayload.messageType.messageDbId,
			senderId: props.messagePayload.clientType.clientDbId,
			username:
				useClientStore
					.getState()
					.clients.find(
						(c) =>
							c.clientDbId ===
							props.messagePayload.clientType.clientDbId,
					)?.clientUsername || "Unknown",
			time: props.messagePayload.messageType.messageTime,
			date: props.messagePayload.messageType.messageDate,
			message: props.messagePayload.messageType.messageContext,
		});
	}
	return (
		<>
			<div
				onClick={() => setShowMenu(!showMenu)}
				onKeyUp={() => setShowMenu(!showMenu)}
				data-testid="chat-message-outer-part-container"
				className="relative mx-2 flex cursor-pointer flex-col items-center self-stretch">
				{/* need the padding on invisible profile picture, else messages will not be aligned -> handle via opacity */}
				<ProfilePicture
					clientDbId={props.messagePayload.clientType.clientDbId}
					style={{
						width: props.lastMessageFromThisClientId
							? "75px"
							: "75px",
						height: props.lastMessageFromThisClientId
							? "40px"
							: "75px",
						borderColor: clientColor || "lightgrey",
						opacity: props.lastMessageFromThisClientId ? "0" : "1",
					}}
				/>
				{/* if profile picture is not visible -> show menu symbol */}
				{props.lastMessageFromThisClientId && (
					<div
						className={`absolute ${menuAlignment} ${menuTopMargin} opacity-0 transition-all duration-500 ease-in-out group-hover/message:opacity-100`}>
						<BubbleMessageMenuSvg />
					</div>
				)}
				<ChatBubbleMenu
					setEnableMessageEditingMode={
						props.setEnableMessageEditingMode
					}
					messagePayload={props.messagePayload}
					showMenu={showMenu}
					setShowMenu={setShowMenu}
					thisMessageFromThisClient={props.thisMessageFromThisClient}
					activateReplyMessage={activateReplyMessage}
				/>
			</div>
		</>
	);
}

export { ChatMessageOuterPart };
