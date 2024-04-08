import { useUserStore } from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { ChatBubbleBottomPart } from "./ChatBubbleBottomPart";
import { ChatBubbleTopPart } from "./ChatBubbleTopPart";

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
                <ChatBubbleBottomPart
                    messagePayload={props.messagePayload}
                    thisMessageFromThisClient={thisMessageFromThisClient}
                />
            </div>
        </>
    );
}

export { ChatMessageBubblePart };
