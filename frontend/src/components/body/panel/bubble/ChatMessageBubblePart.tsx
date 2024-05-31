import { MessagePayload } from "../../../../utils/customTypes";
import { ChatBubbleBottomPart } from "./ChatBubbleBottomPart";
import { ChatBubbleTopPart } from "./ChatBubbleTopPart";
import { ReactionTriggerDiv } from "./reaction/ReactionTriggerDiv";
type ChatMessageBubblePartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
    thisMessageFromThisClient: boolean;
};

// naming is hard
function ChatMessageBubblePart(props: ChatMessageBubblePartProps) {
    const alignChatLeftOrRight = `${props.thisMessageFromThisClient ? "items-end" : "items-start"}`;
    const flexOrder = `${props.thisMessageFromThisClient ? "flex-row" : "flex-row-reverse"}`;

    return (
        <>
            <div className={`flex flex-col ${alignChatLeftOrRight}`}>
                <ChatBubbleTopPart
                    messagePayload={props.messagePayload}
                    lastMessageFromThisClientId={
                        props.lastMessageFromThisClientId
                    }
                    lastMessageTimestampSameAsThisOne={
                        props.lastMessageTimestampSameAsThisOne
                    }
                />
                <div className={`flex ${flexOrder}`}>
                    <ReactionTriggerDiv messagePayload={props.messagePayload} />
                    <ChatBubbleBottomPart
                        messagePayload={props.messagePayload}
                        thisMessageFromThisClient={
                            props.thisMessageFromThisClient
                        }
                    />
                </div>
            </div>
        </>
    );
}

export { ChatMessageBubblePart };
