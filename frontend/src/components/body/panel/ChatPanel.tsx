import { useRef } from "react";
import useMessageMapStore from "../../../stores/messageMapStore";
import { MessagePayload } from "../../../utils/customTypes";
import ChatBubble from "../../ChatBubble";
import { scrollToBottom } from "../../../utils/functionality";

function ChatPanel() {
    // socket state
    const messageMap = useMessageMapStore((state) => state.messageMap);

    const endOfListRef = useRef<HTMLDivElement | null>(null);

    scrollToBottom(endOfListRef);

    return (
        <>
            <div className="px-5 pt-2 pb-2 overflow-y-auto grow">
                {Array.from(messageMap.entries()).map((value, index, array) => {
                    let lastMessageFromThisClientId = false;
                    let lastMessageTimestampSameAsThisOne = false;

                    // console.log("value", value);
                    // console.log("array", array);

                    if (array.length > 1 && index > 0) {
                        const lastMessage: [string, MessagePayload] = array[index - 1];
                        // console.log("lastMessage", lastMessage);
                        if (lastMessage[1].userType.clientId === value[1].userType.clientId) {
                            lastMessageFromThisClientId = true;
                        }
                        if (lastMessage[1].messageType.time === value[1].messageType.time) {
                            lastMessageTimestampSameAsThisOne = true;
                        }
                    }
                    return (
                        <ChatBubble
                            key={value[0]}
                            messagePayload={value[1]}
                            lastMessageFromThisClientId={lastMessageFromThisClientId}
                            lastMessageTimestampSameAsThisOne={lastMessageTimestampSameAsThisOne}
                        />
                    );
                })}
                <div ref={endOfListRef} />
            </div>
        </>
    );
}

export default ChatPanel;