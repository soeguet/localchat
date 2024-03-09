import { CSSProperties, useState } from "react";
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
    const reactionStyle: CSSProperties | undefined = props.thisMessageFromThisClient ? {
        position: "absolute",
        right: 50,
        transition: "all 1s",
        zIndex: 50,
    } : {
        position: "absolute",
        left: 50,
        transition: "all 1s",
        zIndex: 50,
    };
    return (
        <>
            <div className="" onMouseEnter={() => setReactionVisible(true)}
                onMouseLeave={() => setReactionVisible(false)}
            >

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
                <EmojiPicker
                    reactionsDefaultOpen={true}
                    autoFocusSearch={false}
                    lazyLoadEmojis={true}
                    open={reactionVisible}
                    style={reactionStyle}
                />
            </div >
        </>
    );
}

export default ChatBubbleBottomPart;
