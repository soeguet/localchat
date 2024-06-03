import { useClientStore } from "../../../../stores/clientStore";
import { useFontSizeStore } from "../../../../stores/fontSizeStore";
import type { MessagePayload } from "../../../../utils/customTypes";
import { ChatMessageSenderName } from "./ChatMessageSenderName";
import { ChatMessageTimestamp } from "./ChatMessageTimestamp";

type ChatBubbleTopPartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

function ChatBubbleTopPart(props: ChatBubbleTopPartProps) {
    const messageSenderUsername = useClientStore(
        (state) =>
            state.clients.find(
                (c) =>
                    c.clientDbId === props.messagePayload.clientType.clientDbId
            )?.clientUsername
    );
    const fontSize = useFontSizeStore((state) => state.fontSize);
    return (
        <>
            <div
                style={{
                    fontSize: `${fontSize - 5}px`,
                }}>
                {props.messagePayload.messageType.edited && (
                    <span className="text-xs mx-2 text-amber-700">edited</span>
                )}

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

export { ChatBubbleTopPart };
