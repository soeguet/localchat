import { memo } from "react";
import "./ChatMessageUnit.css";
import { MessagePayload } from "../../../../utils/customTypes";
import { ChatMessageBubblePart } from "./ChatMessageBubblePart";
import { ChatMessageOuterPart } from "./ChatMessageOuterPart";
type MessageProps = {
    messagePayload: MessagePayload;
    thisMessageFromThisClient: boolean;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

const ChatMessageUnit = memo((props: MessageProps) => {
    const messageOnWhichSideAligned = `${props.thisMessageFromThisClient ? "flex-row-reverse" : ""}`;
    const howMuchMarginToMessageAbove = `${!props.lastMessageFromThisClientId && !props.lastMessageTimestampSameAsThisOne ? "mt-3" : "mt-1"}`;

    return (
        <div
            className={`group/message flex items-end ${messageOnWhichSideAligned} ${howMuchMarginToMessageAbove}`}
        >
            <ChatMessageOuterPart
                messagePayload={props.messagePayload}
                lastMessageFromThisClientId={props.lastMessageFromThisClientId}
                thisMessageFromThisClient={props.thisMessageFromThisClient}
                lastMessageTimestampSameAsThisOne={
                    props.lastMessageTimestampSameAsThisOne
                }
            />
            <ChatMessageBubblePart
                messagePayload={props.messagePayload}
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
