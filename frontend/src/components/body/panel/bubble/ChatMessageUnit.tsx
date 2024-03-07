import React, { useState } from "react";
import "./ChatMessageUnit.css";
import useClientStore from "../../../../stores/clientStore";
import useReplyStore from "../../../../stores/replyStore";
import useUserStore from "../../../../stores/userStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { getTimeWithHHmmFormat } from "../../../../utils/time";
import ProfilePicture from "../../../reuseable/ProfilePicture";
import ChatBubbleMenu from "./ChatBubbleMenu";
import ChatMessageBubblePart from "./ChatMessageBubblePart";

type MessageProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

function ChatMessageUnit(props: MessageProps) {
    const [showMenu, setShowMenu] = useState(false);
    const thisMessageSenderClientId = props.messagePayload.userType.clientId;
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.userType.clientId
            )?.clientColor
    );
    const thisMessageFromThisClient =
        thisMessageSenderClientId === useUserStore.getState().myId;


    function activateReplyMessage() {
        useReplyStore.getState().setReplyMessage({
            id: props.messagePayload.messageType.messageId,
            senderId: props.messagePayload.userType.clientId,
            username: props.messagePayload.userType.clientUsername,
            time: getTimeWithHHmmFormat(new Date()),
            message: props.messagePayload.messageType.message,
        });
    }

    return (
        <div
            className={`flex items-end ${thisMessageFromThisClient ? "flex-row-reverse" : ""} ${!props.lastMessageFromThisClientId && !props.lastMessageTimestampSameAsThisOne ? "mt-3" : "mt-1"}`}
        >
            <div
                onClick={() => setShowMenu(!showMenu)}
                className="relative mx-2 flex flex-col items-center"
            >
                <ProfilePicture
                    clientId={props.messagePayload.userType.clientId}
                    style={{
                        width: props.lastMessageFromThisClientId
                            ? "75px"
                            : "75px",
                        height: props.lastMessageFromThisClientId
                            ? "40px"
                            : "75px",
                        borderColor: clientColor || "lightgrey",
                        opacity: props.lastMessageFromThisClientId ? "0" : "1",
                    }}
                />
                <ChatBubbleMenu
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    thisMessageFromThisClient={thisMessageFromThisClient}
                    activateReplyMessage={activateReplyMessage}
                />
            </div>
            <ChatMessageBubblePart messagePayload={props.messagePayload} lastMessageFromThisClientId={props.lastMessageFromThisClientId} lastMessageTimestampSameAsThisOne={props.lastMessageTimestampSameAsThisOne} />
        </div>
    );
}

export default React.memo(ChatMessageUnit);
