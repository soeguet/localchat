import { MessagePayload } from "../../../../utils/customTypes";

type ChatMessageTimestampProps = {
    lastMessageTimestampSameAsThisOne: boolean;
    messagePayload: MessagePayload;
};

function ChatMessageTimestamp(props: ChatMessageTimestampProps) {
    return (
        <>
            {!props.lastMessageTimestampSameAsThisOne && (
                <span className="text-gray-500">
                    {props.messagePayload.messageType.messageTime}
                </span>
            )}
        </>
    );
}

export { ChatMessageTimestamp };
