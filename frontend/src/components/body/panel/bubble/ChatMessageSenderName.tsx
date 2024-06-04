type ChatMessageSenderNameProps = {
    lastMessageFromThisClientId: boolean;
    messageSenderUsername: string;
};

function ChatMessageSenderName(props: ChatMessageSenderNameProps) {
    if (props.lastMessageFromThisClientId) {
        return;
    }
    return (
        <>
            <span className="mr-2 font-semibold">
                {props.messageSenderUsername}
            </span>
        </>
    );
}

export { ChatMessageSenderName };
