import {MessagePayload} from "../../../utils/customTypes";
import React, {useDeferredValue, useEffect} from "react";
import ScrollSymbolSvg from "../../svgs/scroll/ScrollSymbolSvg";
import ChatBubble from "./bubble/ChatBubble";
import {useTranslation} from "react-i18next";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import {checkIfScrollToBottomIsNeeded} from "../../../utils/scrollToBottomNeeded";
import {scrollToBottom} from "../../../utils/functionality";
import useMessageMapStore from "../../../stores/messageMapStore";

function MessageRenderMap() {

    const messageMap = useMessageMapStore((state) => state.messageMap);
    const {t} = useTranslation();
    const unreadMessagesCount = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList.length
    );
    const newMap = useDeferredValue(messageMap);
    const idOfTheFirstUnreadMessage = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList[0]
    );

    useEffect(() => {

        // get the last message from newMap
        const lastMessage = Array.from(newMap.entries())[newMap.size - 1];

        if (checkIfScrollToBottomIsNeeded(lastMessage[1].userType.clientId)) {
            scrollToBottom().then(() => {
                useUnseenMessageCountStore.getState().resetUnseenMessageCount();
            });
        } else {
            useUnseenMessageCountStore.getState().incrementUnseenMessageCount();
        }
    }, [newMap]);

    return (
        <>
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
                            <div
                                className="mx-5 my-3 flex grow items-center justify-center rounded-md border border-black bg-gray-400 p-2 text-justify text-lg font-semibold text-white shadow-lg">
                                <ScrollSymbolSvg/>{" "}
                                <div className="mx-5">
                                    {unreadMessagesCount}{" "}
                                    {t("unread_messages_count")} :{" "}
                                    {t("below_unread_messages_start")}{" "}
                                </div>
                                <ScrollSymbolSvg/>
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
        </>
    );
}

export default MessageRenderMap;