import React from "react";
import { checkIfNotificationIsNeeded } from "../../../hooks/socket/utils";
import { MessagePayload, PayloadSubType } from "../../../utils/customTypes";

function ClipButton() {
    function handleClipClick() {
        //console.log("Clip clicked");
        setTimeout(() => {
            // //MakeWindowsTaskIconFlash("localchat");
            // setTimeout(() => {
            //     WindowUnminimise();
            // }, 1000);
            // WindowMinimise();
            // WindowShow();
            checkIfNotificationIsNeeded({
                payloadType: PayloadSubType.message,
                messageType: {
                    message: "This is a test message",
                    time: "12:34",
                    messageId: "1234",
                    messageSenderId: "xyz",
                },
                userType: {
                    clientId: "1234",
                    clientUsername: "testUser",
                    clientProfilePhoto: "",
                },
            } as MessagePayload);
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
