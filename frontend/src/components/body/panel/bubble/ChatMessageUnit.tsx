import { memo, useState } from "react";
import "./ChatMessageUnit.css";
import type { MessagePayload } from "../../../../utils/types/customTypes";
import { ChatMessageBubblePart } from "./ChatMessageBubblePart";
import { ChatMessageOuterPart } from "./ChatMessageOuterPart";
type MessageProps = {
	messagePayload: MessagePayload;
	thisMessageFromThisClient: boolean;
	lastMessageFromThisClientId: boolean;
	lastMessageTimestampSameAsThisOne: boolean;
};

const ChatMessageUnit = memo((props: MessageProps) => {
	const messageOnWhichSideAligned = `${
		props.thisMessageFromThisClient ? "flex-row-reverse" : ""
	}`;
	const howMuchMarginToMessageAbove = `${
		!props.lastMessageFromThisClientId &&
		!props.lastMessageTimestampSameAsThisOne
			? "mt-3"
			: "mt-1"
	}`;
	const [enableMessageEditingMode, setEnableMessageEditingMode] =
		useState(false);

	return (
		<div
			className={`group/message flex items-end ${messageOnWhichSideAligned} ${howMuchMarginToMessageAbove}`}
		>
			<ChatMessageOuterPart
				lastMessageTimestampSameAsThisOne={
					props.lastMessageTimestampSameAsThisOne
				}
				messagePayload={props.messagePayload}
				lastMessageFromThisClientId={props.lastMessageFromThisClientId}
				thisMessageFromThisClient={props.thisMessageFromThisClient}
				setEnableMessageEditingMode={setEnableMessageEditingMode}
			/>
			<ChatMessageBubblePart
				messagePayload={props.messagePayload}
				enableMessageEditingMode={enableMessageEditingMode}
				setEnableMessageEditingMode={setEnableMessageEditingMode}
				thisMessageFromThisClient={props.thisMessageFromThisClient}
				lastMessageFromThisClientId={props.lastMessageFromThisClientId}
				lastMessageTimestampSameAsThisOne={
					props.lastMessageTimestampSameAsThisOne
				}
			/>
		</div>
	);
});

ChatMessageUnit.displayName = "ChatMessageUnit";

export { ChatMessageUnit };