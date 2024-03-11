import useClientStore from "../../../../stores/clientStore";
import useFontSizeStore from "../../../../stores/fontSizeStore";
import { MessagePayload } from "../../../../utils/customTypes";
import ChatMessageSenderName from "./ChatMessageSenderName";
import ChatMessageTimestamp from "./ChatMessageTimestamp";

type ChatBubbleTopPartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

function ChatBubbleTopPart(props: ChatBubbleTopPartProps) {
    const messageSenderUsername = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.userType.userId
            )?.username
    );
    const fontSize = useFontSizeStore((state) => state.fontSize);
    return (
        <>
            <div
                style={{
                    fontSize: `${fontSize - 5}px`,
                }}
            >
                <ChatMessageSenderName
                    messageSenderUsername={messageSenderUsername || "Unknown"}
                    lastMessageFromThisClientId={
                        props.lastMessageFromThisClientId
                    }
                />
                <ChatMessageTimestamp
                    messagePayload={props.messagePayload}
                    lastMessageTimestampSameAsThisOne={
                        props.lastMessageTimestampSameAsThisOne
                    }
                />
            </div>
        </>
    );
}

export default ChatBubbleTopPart;
