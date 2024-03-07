import useClientStore from "../../../../stores/clientStore";
import useUnseenMessageCountStore from "../../../../stores/unseenMessageCountStore";
import { MessagePayload } from "../../../../utils/customTypes";
import LinkifiedText from "../LinkifiedText";
import QuoteBubble from "../QuoteBubble";

type ChatBubbleBottomPartProps = {
    messagePayload: MessagePayload;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleBottomPart(props: ChatBubbleBottomPartProps) {
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.userType.clientId
            )?.clientColor
    );
    const unseenMessagesIdList = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList
    );
    // useMemo does not seem to be worth it tbh
    const thisMessageUnseen = unseenMessagesIdList.includes(
        props.messagePayload.messageType.messageId
    );
    const defaultChatBubbleColor = `${props.thisMessageFromThisClient ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`;
    return (
        <>
            <div
                className={`relative max-w-md break-words rounded-lg border border-black px-4 py-2 md:max-w-2xl lg:max-w-4xl ${defaultChatBubbleColor}`}
                style={{
                    backgroundColor: clientColor,
                    animation: thisMessageUnseen
                        ? "pulse-border 3.5s infinite ease-in-out"
                        : "",
                    borderColor: thisMessageUnseen ? "orange" : "black",
                    borderWidth: thisMessageUnseen ? "2px" : "1px",
                }}
            >
                <QuoteBubble payload={props.messagePayload} />
                <LinkifiedText
                    text={props.messagePayload.messageType.message}
                />
            </div>
        </>
    );
}

export default ChatBubbleBottomPart;
