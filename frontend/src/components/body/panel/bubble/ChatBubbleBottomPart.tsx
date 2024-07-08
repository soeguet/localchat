import { useClientStore } from "../../../../stores/clientStore";
import { useUnseenMessageCountStore } from "../../../../stores/unseenMessageCountStore";
import type { MessagePayload } from "../../../../utils/customTypes";
import { QuoteBubble } from "../QuoteBubble";
import { base64ToUtf8 } from "../../../../utils/encoder";
import { ReactionField } from "./reaction/ReactionField";
import { EditMessageMode } from "./EditMessageMode";
import PictureBubblePanel from "./picture/PictureBubblePanel";

type ChatBubbleBottomPartProps = {
	messagePayload: MessagePayload;
	enableMessageEditingMode: boolean;
	setEnableMessageEditingMode: (enable: boolean) => void;
	thisMessageFromThisClient: boolean;
};

function ChatBubbleBottomPart(props: ChatBubbleBottomPartProps) {
	const clientColor = useClientStore(
		(state) =>
			state.clients.find((c): boolean => {
				return c.clientDbId === props.messagePayload.clientType.clientDbId;
			})?.clientColor,
	);
	const unseenMessagesIdList = useUnseenMessageCountStore(
		(state) => state.unseenMessagesIdList,
	);
	// useMemo does not seem to be worth it tbh
	const thisMessageUnseen = unseenMessagesIdList.includes(
		props.messagePayload.messageType.messageDbId,
	);
	const defaultChatBubbleColor = `${
		props.thisMessageFromThisClient
			? "bg-blue-500 text-white"
			: "bg-gray-500 text-white"
	}`;

	// TODO refactor this into functions
	let borderColor = props.messagePayload.messageType.edited
		? "border-amber-700"
		: "border-black";

	if (thisMessageUnseen) {
		borderColor = "border-orange";
	}

	const base64DecodedMessage = base64ToUtf8(
		props.messagePayload.messageType.messageContext,
	);

	let margin = "";

	if (
		props.messagePayload.reactionType !== undefined &&
		props.messagePayload.reactionType?.length > 0
	) {
		margin = "mb-7";
	}

	return (
		<>
			<div className={margin}>
				<div
					className={`relative peer-focus/edit:animate-pulse  max-w-md break-words rounded-lg border ${borderColor} px-4 py-2 md:max-w-2xl lg:max-w-4xl ${defaultChatBubbleColor}`}
					style={{
						backgroundColor: clientColor,
						animation: thisMessageUnseen
							? "pulse-border 3.5s infinite ease-in-out"
							: "",
						borderWidth: thisMessageUnseen ? "2px" : "1px",
					}}
				>
					<PictureBubblePanel messagePayload={props.messagePayload} />

					<QuoteBubble payload={props.messagePayload} />
					{props.enableMessageEditingMode ? (
						<EditMessageMode
							messagePayload={props.messagePayload}
							setEnableMessageEditingMode={props.setEnableMessageEditingMode}
						/>
					) : (
						<div className="whitespace-pre-wrap">{base64DecodedMessage}</div>
					)}
					{/* // TODO reenable links in message
					<LinkifiedText
                        text={props.messagePayload.messageType.messageContext}
                    />*/}
					{props.messagePayload.reactionType &&
						props.messagePayload.reactionType.length > 0 && (
							<ReactionField messagePayload={props.messagePayload} />
						)}
				</div>
			</div>
		</>
	);
}

export { ChatBubbleBottomPart };
