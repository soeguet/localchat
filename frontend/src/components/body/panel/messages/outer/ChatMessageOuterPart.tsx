import { useState } from "react";
import { useClientStore } from "../../../../../stores/clientStore";
import { useReplyStore } from "../../../../../stores/replyStore";
import type { MessagePayload } from "../../../../../utils/types/customTypes";
import { DEFAULT_STROKE_COLOR } from "../../../../../utils/variables/variables";
import { ProfilePicture } from "../../../../shared-comps/ProfilePicture";
import { BubbleMessageMenuSvg } from "../../../../svgs/bubble/BubbleMessageMenuSvg";
import { ChatBubbleMenu } from "../menu/ChatBubbleMenu";
type ChatMessageOuterPartProps = {
	messagePayload: MessagePayload;
	lastMessageFromThisClientId: boolean;
	thisMessageFromThisClient: boolean;
	lastMessageTimestampSameAsThisOne: boolean;
	setEnableMessageEditingMode: (enable: boolean) => void;
};

function ChatMessageOuterPart(props: ChatMessageOuterPartProps) {
	// state
	const [showMenu, setShowMenu] = useState(false);
	const menuAlignment = props.thisMessageFromThisClient
		? "left-0"
		: "right-0";
	const clientColor = useClientStore(
		(state) =>
			state.getClientFromMapById(
				props.messagePayload.clientType.clientDbId,
			)?.clientColor,
	);
	const clientProfilePictureHash = useClientStore(
		(state) =>
			state.getClientFromMapById(
				props.messagePayload.clientType.clientDbId,
			)?.clientProfilePictureHash,
	);
	// state

	const determineTopMarginForMessageMenu = () => {
		if (!props.lastMessageTimestampSameAsThisOne) {
			return "top-6";
		}
		if (props.messagePayload.messageType.edited) {
			return "top-6";
		}

		return "top-1";
	};

	const activateReplyMessage = () => {
		useReplyStore.getState().setReplyMessage({
			id: props.messagePayload.messageType.messageDbId,
			senderId: props.messagePayload.clientType.clientDbId,
			username:
				useClientStore
					.getState()
					.clientMap.get(props.messagePayload.clientType.clientDbId)
					?.clientUsername || "Unknown",
			time: props.messagePayload.messageType.messageTime,
			date: props.messagePayload.messageType.messageDate,
			message: props.messagePayload.messageType.messageContext,
		});
	};

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
					pictureHash={clientProfilePictureHash ?? null}
					style={{
						width: props.lastMessageFromThisClientId
							? "75px"
							: "75px",
						height: props.lastMessageFromThisClientId
							? "40px"
							: "75px",
						borderColor: clientColor || DEFAULT_STROKE_COLOR,
						opacity: props.lastMessageFromThisClientId ? "0" : "1",
					}}
					pictureUrl={null}
					properties={null}
				/>
				{/* if profile picture is not visible -> show menu symbol */}
				{props.lastMessageFromThisClientId && (
					<div
						className={`absolute ${menuAlignment} ${determineTopMarginForMessageMenu()} opacity-0 transition-all duration-500 ease-in-out group-hover/message:opacity-100`}>
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