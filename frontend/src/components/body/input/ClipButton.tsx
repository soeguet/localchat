import { memo } from "react";
import {
    checkIfMessageIsToBeAddedToTheUnseenMessagesList,
    checkIfNotificationIsNeeded,
} from "../../../hooks/socket/utils";
import { useMessageMapStore } from "../../../stores/messageMapStore";
import {
    type MessagePayload,
    PayloadSubType,
} from "../../../utils/customTypes";
import { utf8ToBase64 } from "../../../utils/encoder";
import { generateSimpleId } from "../../../utils/functionality";
import { checkIfScrollToBottomIsNeeded } from "../../../utils/scrollToBottomNeeded";

const ClipButton = memo(() => {
    function handleClipClick() {
        setTimeout(() => {
            const messagePayload: MessagePayload = {
                payloadType: PayloadSubType.message,
                messageType: {
                    messageContext: utf8ToBase64("This is a test message"),
                    deleted: false,
                    edited: false,
                    messageTime: "12:34",
                    messageDate: "2021-12-12",
                    messageDbId: generateSimpleId(),
                },
                clientType: {
                    clientDbId: "1234",
                },
                quoteType: {
                    quoteDbId: "replyMessage.id",
                    quoteClientId: "replyMessage.senderId",
                    quoteMessageContext: utf8ToBase64("replyMessage.message"),
                    quoteTime: "replyMessage.time",
                    quoteDate: "replyMessage.date",
                },
            };

            useMessageMapStore.getState().onMessage(messagePayload);

            // if scroll to bottom is not needed, add the message to the unseen messages list
            const addIdToList = !checkIfScrollToBottomIsNeeded(
                messagePayload.clientType.clientDbId
            );
            checkIfMessageIsToBeAddedToTheUnseenMessagesList(
                messagePayload,
                addIdToList
            );

            //display the message
            checkIfNotificationIsNeeded(messagePayload);
        }, 3000);
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClipClick}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-paperclip">📎</i>
            </button>
        </>
    );
});

ClipButton.displayName = "ClipButton";

export { ClipButton };
