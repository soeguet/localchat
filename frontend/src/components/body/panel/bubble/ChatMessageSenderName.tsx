type ChatMessageSenderNameProps = {
    lastMessageFromThisClientId: boolean;
    messageSenderUsername: string;
};

function ChatMessageSenderName(props: ChatMessageSenderNameProps) {
    return (
        <>
            {!props.lastMessageFromThisClientId && (
                <span className="font-semibold">
                    {props.messageSenderUsername}
                </span>
            )}{" "}
        </>
    );
}

export default ChatMessageSenderName;
