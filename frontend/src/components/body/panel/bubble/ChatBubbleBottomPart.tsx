import { CSSProperties, useState } from "react";
import useClientStore from "../../../../stores/clientStore";
import useUnseenMessageCountStore from "../../../../stores/unseenMessageCountStore";
import { MessagePayload, PayloadSubType } from "../../../../utils/customTypes";
import LinkifiedText from "../LinkifiedText";
import QuoteBubble from "../QuoteBubble";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import useUserStore from "../../../../stores/userStore";
import useWebsocketStore from "../../../../stores/websocketStore";

type ChatBubbleBottomPartProps = {
    messagePayload: MessagePayload;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleBottomPart(props: ChatBubbleBottomPartProps) {
    const [reactionVisible, setReactionVisible] = useState(false);
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.clientDbId === props.messagePayload.clientType.clientDbId
            )?.clientColor
    );
    const unseenMessagesIdList = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList
    );
    // useMemo does not seem to be worth it tbh
    const thisMessageUnseen = unseenMessagesIdList.includes(
        props.messagePayload.messageType.messageDbId
    );
    const defaultChatBubbleColor = `${props.thisMessageFromThisClient ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`;
    const reactionStyle: CSSProperties | undefined =
        props.thisMessageFromThisClient
            ? {
                  position: "absolute",
                  right: 50,
                  transition: "all 1s",
                  zIndex: 50,
              }
            : {
                  position: "absolute",
                  left: 50,
                  transition: "all 1s",
                  zIndex: 50,
              };

    type ReactionPayload = {
        messagePayloadId?: number;
        payloadType: PayloadSubType.reaction;
        id: string;
        emoji: string;
        userId: string;
    };

    function sendReactionToSocket(emoji: EmojiClickData, event: MouseEvent) {
        event.preventDefault();
        const reactionPayload: ReactionPayload = {
            // TODO
            payloadType: PayloadSubType.reaction,
            id: props.messagePayload.messageType.messageDbId,
            emoji: emoji.emoji,
            userId: useUserStore.getState().myId,
        };

        useWebsocketStore.getState().ws?.send(JSON.stringify(reactionPayload));
    }

    return (
        <>
            <div
                className=""
                onMouseEnter={() => setReactionVisible(true)}
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
                    {props.messagePayload.messageType.messageConext}
                    {/*<LinkifiedText
                        text={props.messagePayload.messageType.messageConext}
                    />*/}
                    <div className="text-xs text-gray-300">
                        asd
                        {props.messagePayload.reactionType?.map((reaction) => {
                            return (
                                <span
                                    key={reaction.reactionContext}
                                    className="mr-1"
                                >
                                    {reaction.reactionContext}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <EmojiPicker
                    reactionsDefaultOpen={true}
                    autoFocusSearch={false}
                    lazyLoadEmojis={true}
                    onReactionClick={sendReactionToSocket}
                    open={reactionVisible}
                    style={reactionStyle}
                />
            </div>
        </>
    );
}

export default ChatBubbleBottomPart;
