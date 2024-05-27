import { memo } from "react";
import "./ChatMessageUnit.css";
import { useUserStore } from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { ChatMessageBubblePart } from "./ChatMessageBubblePart";
import { ChatMessageOuterPart } from "./ChatMessageOuterPart";

type MessageProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

const ChatMessageUnit = memo((props: MessageProps) => {
    const thisMessageSenderClientId =
        props.messagePayload.clientType.clientDbId;
    const thisMessageFromThisClient =
        thisMessageSenderClientId === useUserStore.getState().myId;

    const messageOnWhichSideAligned = `${thisMessageFromThisClient ? "flex-row-reverse" : ""}`;
    const howMuchMarginToMessageAbove = `${!props.lastMessageFromThisClientId && !props.lastMessageTimestampSameAsThisOne ? "mt-3" : "mt-1"}`;

    return (
        <div
            className={`group/message flex items-end ${messageOnWhichSideAligned} ${howMuchMarginToMessageAbove}`}
        >
            <ChatMessageOuterPart
                messagePayload={props.messagePayload}
                lastMessageFromThisClientId={props.lastMessageFromThisClientId}
                thisMessageFromThisClient={thisMessageFromThisClient}
            />
            <ChatMessageBubblePart
                messagePayload={props.messagePayload}
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
