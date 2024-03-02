import { useEffect, useRef } from "react";
import useMessageMapStore from "../../../stores/messageMapStore";
import { MessagePayload } from "../../../utils/customTypes";
import ChatBubble from "../../ChatBubble";
import { scrollToBottom } from "../../../utils/functionality";
import { isVisibleInViewport } from "../../../utils/isVisibleInViewport";
import ScrollSymbol from "../../svgs/scroll/ScrollSymbol";
import useChatBottomRefVisibleStore from "../../../stores/chatBottomRefVisibleStore";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";

function ChatPanel() {
    // socket state
    const messageMap = useMessageMapStore((state) => state.messageMap);
    const { chatBottomRefVisible, setChatBottomRefVisible } = useChatBottomRefVisibleStore();

    const chatBottomRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // scrollToBottom(endOfListRef);
    useEffect(() => {
        const checkVisibility = () => {
            if (chatBottomRef.current && chatContainerRef.current) {
                const visible = isVisibleInViewport(chatBottomRef.current, chatContainerRef.current, true);
                setChatBottomRefVisible(visible);
            }
        };

        // Überprüfung bei Initialisierung
        checkVisibility();

        // Event Listener für Scroll-Events hinzufügen
        const container = chatContainerRef.current;
        container?.addEventListener("scroll", checkVisibility);

        // Cleanup-Funktion, um Event Listener zu entfernen
        return () => {
            container?.removeEventListener("scroll", checkVisibility);
        };
    }, []);

    return (
        <>
            <div ref={chatContainerRef} className="px-5 pt-2 pb-2 overflow-y-auto grow">
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
                {!chatBottomRefVisible && (
                    <button
                        onClick={() => {
                            scrollToBottom(chatBottomRef);
                            useUnseenMessageCountStore.getState().resetUnseenMessageCount();
                        }}
                        className="fixed right-0 z-50 flex items-center justify-center max-w-xs mb-3 text-xs transition duration-300 ease-in-out transform -translate-x-1/2 bg-gray-200 border border-black mr-5 rounded-full shadow animate-bounce size-10 bottom-24 hover:border-cyan-500"
                    >
                        <ScrollSymbol />
                    </button>
                )}
                <div ref={chatBottomRef} />
            </div>
        </>
    );
}

export default ChatPanel;
