import { memo } from "react";
import "./ChatMessageUnit.css";
import { useUserStore } from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { ChatMessageBubblePart } from "./ChatMessageBubblePart";
import { ChatMessageOuterPart } from "./ChatMessageOuterPart";
import { ReactionTriggerDiv } from "./reaction/ReactionTriggerDiv";

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
            className={`flex items-end ${messageOnWhichSideAligned} ${howMuchMarginToMessageAbove}`}
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
            <ReactionTriggerDiv messagePayload={props.messagePayload} />
        </div>
    );
});

ChatMessageUnit.displayName = "ChatMessageUnit";

export { ChatMessageUnit };
