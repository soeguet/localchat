import { useCallback, useDeferredValue, useEffect, useRef } from "react";
import useMessageMapStore from "../../../stores/messageMapStore";
import { MessagePayload } from "../../../utils/customTypes";
import ChatBubble from "../bubble/ChatBubble";
import { scrollToBottom } from "../../../utils/functionality";
import ScrollSymbol from "../../svgs/scroll/ScrollSymbol";
import useChatBottomRefVisibleStore from "../../../stores/chatBottomRefVisibleStore";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import { checkIfScrollToBottomIsNeeded } from "../../../utils/scrollToBottomNeeded";
import { useTranslation } from "react-i18next";
import React from "react";

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
    const { t } = useTranslation();
    // socket state
    const messageMap = useMessageMapStore((state) => state.messageMap);
    const { chatBottomRefVisible, setChatBottomRefVisible, setChatBottomRef } = useChatBottomRefVisibleStore();
    const unreadMessagesCount = useUnseenMessageCountStore((state) => state.unseenMessagesIdList.length);

    const newMap = useDeferredValue(messageMap);

    const idOfTheFirstUnreadMessage = useUnseenMessageCountStore((state) => state.unseenMessagesIdList[0]);

    //console.log("CHATPANEL RENDER");
    const chatBottomRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChatBottomRef(chatBottomRef);
    }, []);

    useEffect(() => {
        if (checkIfScrollToBottomIsNeeded()) {
            scrollToBottom();
            useUnseenMessageCountStore.getState().resetUnseenMessageCount();
        } else {
            useUnseenMessageCountStore.getState().incrementUnseenMessageCount();
        }
    }, [newMap]);

    const handleScroll = useCallback(
        debounce(() => {
            if (!chatContainerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
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

                    const thisIsTheFirstUnreadMessage = value[1].messageType.messageId === idOfTheFirstUnreadMessage;

                    // //console.log("value", value);
                    // //console.log("array", array);

                    if (array.length > 1 && index > 0) {
                        const lastMessage: [string, MessagePayload] = array[index - 1];
                        // //console.log("lastMessage", lastMessage);
                        if (lastMessage[1].userType.clientId === value[1].userType.clientId) {
                            lastMessageFromThisClientId = true;
                        }
                        if (lastMessage[1].messageType.time === value[1].messageType.time) {
                            lastMessageTimestampSameAsThisOne = true;
                        }
                    }
                    return (
                        <React.Fragment key={value[0]}>
                            {thisIsTheFirstUnreadMessage && (
                                <div
                                    className="flex items-center justify-center grow bg-gray-400 border border-black mx-5 my-3 p-2 rounded-md shadow-lg text-white text-justify font-semibold text-lg"
                                >
                                    <ScrollSymbol />{" "}
                                    <div className="mx-5" >
                                        {unreadMessagesCount} {t("unread_messages_count")} :{" "}
                                        {t("below_unread_messages_start")}{" "}
                                    </div>
                                    <ScrollSymbol />
                                </div>
                            )}
                            <ChatBubble
                                messagePayload={value[1]}
                                lastMessageFromThisClientId={lastMessageFromThisClientId}
                                lastMessageTimestampSameAsThisOne={lastMessageTimestampSameAsThisOne}
                            />
                        </React.Fragment>
                    );
                })}
                {!chatBottomRefVisible && (
                    <button
                        onClick={async () => {
                            await scrollToBottom();
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
