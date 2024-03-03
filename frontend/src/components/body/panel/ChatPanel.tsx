import { useCallback, useDeferredValue, useEffect, useRef } from "react";
import useMessageMapStore from "../../../stores/messageMapStore";
import { MessagePayload } from "../../../utils/customTypes";
import ChatBubble from "../../ChatBubble";
import { scrollToBottom } from "../../../utils/functionality";
import ScrollSymbol from "../../svgs/scroll/ScrollSymbol";
import useChatBottomRefVisibleStore from "../../../stores/chatBottomRefVisibleStore";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);
    };
}

function ChatPanel() {
    // socket state
    const messageMap = useMessageMapStore((state) => state.messageMap);
    const { chatBottomRefVisible, setChatBottomRefVisible } = useChatBottomRefVisibleStore();

    const newMap = useDeferredValue(messageMap);

    console.log("CHATPANEL RENDER");
    const chatBottomRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(
        debounce(() => {
            if (!chatContainerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log("Am unteren Rand");
                setChatBottomRefVisible(true);
            } else {
                setChatBottomRefVisible(false);
            }
        }, 250),
        []
    );

    useEffect(() => {
        const element = chatContainerRef.current;
        if (element) {
            element.addEventListener("scroll", handleScroll);

            return () => {
                element.removeEventListener("scroll", handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <>
            <div ref={chatContainerRef} className="px-5 pt-2 pb-2 overflow-y-auto grow">
                {Array.from(newMap.entries()).map((value, index, array) => {
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
                            scrollToBottom();
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
