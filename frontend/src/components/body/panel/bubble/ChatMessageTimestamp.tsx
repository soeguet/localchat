import type { MessagePayload } from "../../../../utils/customTypes";

type ChatMessageTimestampProps = {
    lastMessageTimestampSameAsThisOne: boolean;
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
};

function ChatMessageTimestamp(props: ChatMessageTimestampProps) {
    if (
        props.lastMessageFromThisClientId &&
        props.lastMessageTimestampSameAsThisOne
    ) {
        return;
    }
    return (
        <>
            <span className="text-gray-500">
                {props.messagePayload.messageType.messageTime}
            </span>
        </>
    );
}

export { ChatMessageTimestamp };
