import { MessagePayload } from "../../../utils/customTypes";
import React, { useDeferredValue, useEffect } from "react";
import ChatMessageUnit from "./bubble/ChatMessageUnit";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import { checkIfScrollToBottomIsNeeded } from "../../../utils/scrollToBottomNeeded";
import { scrollToBottom } from "../../../utils/functionality";
import useMessageMapStore from "../../../stores/messageMapStore";
import UnreadMessagesBelowBanner from "./UnreadMessagesBelowBanner";

function MessageRenderMap() {
    const messageMap = useMessageMapStore((state) => state.messageMap);
    const newMap = useDeferredValue(messageMap);
    const idOfTheFirstUnreadMessage = useUnseenMessageCountStore(
        (state) => state.unseenMessagesIdList[0]
    );

    useEffect(() => {
        // get the last message from newMap
        if (newMap.size === 0) return;

        const lastMessage = Array.from(newMap.entries())[newMap.size - 1];

        if (lastMessage[1].clientType.clientDbId === undefined) {
            return;
        }
        if (checkIfScrollToBottomIsNeeded(lastMessage[1].clientType.clientDbId)) {
            scrollToBottom().then(() => {
                useUnseenMessageCountStore.getState().resetUnseenMessageCount();
            });
        } else {
            useUnseenMessageCountStore.getState().incrementUnseenMessageCount();
        }
    }, [newMap]);

    return (
        <>
            aasdasd
            {newMap.size > 0 &&
                Array.from(newMap.entries()).map((value, index, array) => {
                    let lastMessageFromThisClientId = false;
                    let lastMessageTimestampSameAsThisOne = false;

                    const thisIsTheFirstUnreadMessage =
                        value[1].messageType.messageId ===
                        idOfTheFirstUnreadMessage;

                    //console.log("value", value);
                    //console.log("array", array);

                    if (array.length > 1 && index > 0) {
                        const lastMessage: [string, MessagePayload] =
                            array[index - 1];
                        //console.log("lastMessage", lastMessage);
                        if (
                            lastMessage[1].clientType.clientDbId !== undefined &&
                            lastMessage[1].clientType.clientDbId ===
                            value[1].clientType.clientDbId
                        ) {
                            lastMessageFromThisClientId = true;
                        }
                        if (
                            lastMessage[1].messageType.messageTime===
                            value[1].messageType.messageTime
                        ) {
                            lastMessageTimestampSameAsThisOne = true;
                        }
                    }

                    return (
                        <React.Fragment key={value[0]}>
                            <UnreadMessagesBelowBanner
                                thisIsTheFirstUnreadMessage={
                                    thisIsTheFirstUnreadMessage
                                }
                            />
                            <ChatMessageUnit
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
