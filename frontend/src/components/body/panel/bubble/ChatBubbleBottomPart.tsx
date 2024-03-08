import { useState } from "react";
import useClientStore from "../../../../stores/clientStore";
import useUnseenMessageCountStore from "../../../../stores/unseenMessageCountStore";
import { MessagePayload } from "../../../../utils/customTypes";
import LinkifiedText from "../LinkifiedText";
import QuoteBubble from "../QuoteBubble";
import EmojiPicker from "emoji-picker-react";

type ChatBubbleBottomPartProps = {
    messagePayload: MessagePayload;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleBottomPart(props: ChatBubbleBottomPartProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [reactionVisible, setReactionVisible] = useState(false);
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
                onMouseEnter={(event) => {
                    setReactionVisible(true);
                    setPosition({ x: event.clientX, y: event.clientY });
                }}
                onMouseLeave={() => setReactionVisible(false)}
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
                <EmojiPicker
                    reactionsDefaultOpen={true}
                    open={reactionVisible}
                    style={{
                        position: "fixed",
                        left: position.x - 250,
                        top: position.y,
                        zIndex: 50,
                    }}
                />
            </div>
        </>
    );
}

export default ChatBubbleBottomPart;
