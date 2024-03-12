import React from "react";
import {
    checkIfMessageIsToBeAddedToTheUnseenMessagesList,
    checkIfNotificationIsNeeded
} from "../../../hooks/socket/utils";
import {PayloadSubType} from "../../../utils/customTypes";
import {checkIfScrollToBottomIsNeeded} from "../../../utils/scrollToBottomNeeded";
import useMessageMapStore from "../../../stores/messageMapStore";

function ClipButton() {
    function handleClipClick() {
        //console.log("Clip clicked");
        setTimeout(() => {
            const messagePayload = {
                payloadType: PayloadSubType.message,
                messageType: {
                    message: "This is a test message",
                    time: "12:34",
                    messageId: Math.random().toString(36).substring(7),
                    messageSenderId: "xyz",
                },
                userType: {
                    userId: "1234",
                    userName: "testUser",
                    userProfilePhoto: "",
                },
            };

            useMessageMapStore.getState().onMessage(messagePayload);

            // if scroll to bottom is not needed, add the message to the unseen messages list
            const addIdToList = !checkIfScrollToBottomIsNeeded(messagePayload.users.userId);
            checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayload, addIdToList);

            //display the message
            checkIfNotificationIsNeeded(messagePayload);

        }, 3000);
    }

    return (
        <>
            <button
                onClick={handleClipClick}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <i className="far fa-paperclip">📎</i>
            </button>
        </>
    );
}

export default React.memo(ClipButton);
