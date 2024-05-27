import { useUserStore } from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { ChatBubbleBottomPart } from "./ChatBubbleBottomPart";
import { ChatBubbleTopPart } from "./ChatBubbleTopPart";
import { ReactionTriggerDiv } from "./reaction/ReactionTriggerDiv";

type ChatMessageBubblePartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

// naming is hard
function ChatMessageBubblePart(props: ChatMessageBubblePartProps) {
    const thisClientId = useUserStore((state) => state.myId);
    const thisMessageFromThisClient =
        props.messagePayload.clientType.clientDbId === thisClientId;

    const alignChatLeftOrRight = `${thisMessageFromThisClient ? "items-end" : "items-start"}`;
    const flexOrder = `${thisMessageFromThisClient ? "flex-row" : "flex-row-reverse"}`;

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
                        thisMessageFromThisClient={thisMessageFromThisClient}
                    />
                </div>
            </div>
        </>
    );
}

export { ChatMessageBubblePart };
