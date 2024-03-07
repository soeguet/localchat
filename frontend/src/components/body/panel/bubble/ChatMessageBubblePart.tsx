import useClientStore, { getClientById } from "../../../../stores/clientStore";
import useFontSizeStore from "../../../../stores/fontSizeStore";
import useUnseenMessageCountStore from "../../../../stores/unseenMessageCountStore";
import useUserStore from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import LinkifiedText from "../LinkifiedText";
import QuoteBubble from "../QuoteBubble";

type ChatMessageBubblePartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

// naming is hard
function ChatMessageBubblePart(props: ChatMessageBubblePartProps) {
    const thisClientId = useUserStore((state) => state.myId);
    const thisMessageFromThisClient =
        props.messagePayload.userType.clientId === thisClientId;
    const messageSenderUsername = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.userType.clientId
            )?.username
    );
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.userType.clientId
            )?.clientColor
    );
    const unseenMessagesIdList = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList
    );
    const fontSize = useFontSizeStore((state) => state.fontSize);

    // useMemo does not seem to be worth it tbh
    const thisMessageUnseen = unseenMessagesIdList.includes(
        props.messagePayload.messageType.messageId
    );

    return (
        <div
            className={`flex flex-col ${thisMessageFromThisClient ? "items-end" : "items-start"}`}
        >
            <div
                style={{
                    fontSize: `${fontSize - 5}px`,
                }}
            >
                {!props.lastMessageFromThisClientId && (
                    <span className="font-semibold">
                        {messageSenderUsername}
                    </span>
                )}{" "}
                {!props.lastMessageTimestampSameAsThisOne && (
                    <span className="text-gray-500">
                        {props.messagePayload.messageType.time}
                    </span>
                )}
            </div>
            <div
                className={`relative max-w-md break-words rounded-lg border border-black px-4 py-2 md:max-w-2xl lg:max-w-4xl ${thisMessageFromThisClient ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
                style={{
                    backgroundColor: clientColor,
                    animation: thisMessageUnseen
                        ? "pulse-border 3.5s infinite ease-in-out"
                        : "",
                    borderColor: thisMessageUnseen ? "orange" : "black",
                    borderWidth: thisMessageUnseen ? "2px" : "1px",
                }}
            >
                {props.messagePayload.quoteType && (
                    <QuoteBubble
                        message={props.messagePayload.quoteType.quoteMessage}
                        time={props.messagePayload.quoteType.quoteTime}
                        sender={
                            getClientById(
                                props.messagePayload.quoteType.quoteSenderId
                            )?.username || "Unknown"
                        }
                    />
                )}
                <LinkifiedText
                    text={props.messagePayload.messageType.message}
                />
            </div>
        </div>
    );
}

export default ChatMessageBubblePart;
