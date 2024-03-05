import { useCallback, useDeferredValue, useEffect, useRef } from "react";
import useMessageMapStore from "../../../stores/messageMapStore";
import { MessagePayload } from "../../../utils/customTypes";
import { scrollToBottom } from "../../../utils/functionality";
import ScrollSymbolSvg from "../../svgs/scroll/ScrollSymbolSvg";
import useChatBottomRefVisibleStore from "../../../stores/chatBottomRefVisibleStore";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import { checkIfScrollToBottomIsNeeded } from "../../../utils/scrollToBottomNeeded";
import { useTranslation } from "react-i18next";
import React from "react";
import ChatBubble from "./bubble/ChatBubble";

function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
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
    const { chatBottomRefVisible, setChatBottomRefVisible, setChatBottomRef } =
        useChatBottomRefVisibleStore();
    const unreadMessagesCount = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList.length
    );

    const newMap = useDeferredValue(messageMap);

    const idOfTheFirstUnreadMessage = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList[0]
    );

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

            const { scrollTop, scrollHeight, clientHeight } =
                chatContainerRef.current;
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
            <div
                ref={chatContainerRef}
                className="grow overflow-y-auto px-5 pb-2 pt-2"
            >
                {Array.from(newMap.entries()).map((value, index, array) => {
                    let lastMessageFromThisClientId = false;
                    let lastMessageTimestampSameAsThisOne = false;

                    const thisIsTheFirstUnreadMessage =
                        value[1].messageType.messageId ===
                        idOfTheFirstUnreadMessage;

                    // //console.log("value", value);
                    // //console.log("array", array);

                    if (array.length > 1 && index > 0) {
                        const lastMessage: [string, MessagePayload] =
                            array[index - 1];
                        // //console.log("lastMessage", lastMessage);
                        if (
                            lastMessage[1].userType.clientId ===
                            value[1].userType.clientId
                        ) {
                            lastMessageFromThisClientId = true;
                        }
                        if (
                            lastMessage[1].messageType.time ===
                            value[1].messageType.time
                        ) {
                            lastMessageTimestampSameAsThisOne = true;
                        }
                    }
                    return (
                        <React.Fragment key={value[0]}>
                            {thisIsTheFirstUnreadMessage && (
                                <div className="mx-5 my-3 flex grow items-center justify-center rounded-md border border-black bg-gray-400 p-2 text-justify text-lg font-semibold text-white shadow-lg">
                                    <ScrollSymbolSvg />{" "}
                                    <div className="mx-5">
                                        {unreadMessagesCount}{" "}
                                        {t("unread_messages_count")} :{" "}
                                        {t("below_unread_messages_start")}{" "}
                                    </div>
                                    <ScrollSymbolSvg />
                                </div>
                            )}
                            <ChatBubble
                                messagePayload={value[1]}
                                lastMessageFromThisClientId={
                                    lastMessageFromThisClientId
                                }
                                lastMessageTimestampSameAsThisOne={
                                    lastMessageTimestampSameAsThisOne
                                }
                            />
                        </React.Fragment>
                    );
                })}
                {!chatBottomRefVisible && (
                    <button
                        onClick={async () => {
                            await scrollToBottom();
                            useUnseenMessageCountStore
                                .getState()
                                .resetUnseenMessageCount();
                        }}
                        className="fixed bottom-24 right-0 z-50 mb-3 mr-5 flex size-10 max-w-xs -translate-x-1/2 transform animate-bounce items-center justify-center rounded-full border border-black bg-gray-200 text-xs shadow transition duration-300 ease-in-out hover:border-cyan-500"
                    >
                        <ScrollSymbolSvg />
                    </button>
                )}
                <div ref={chatBottomRef} />
            </div>
        </>
    );
}

export default ChatPanel;
