import { useState } from "react";
import useClientStore from "../../../../stores/clientStore";
import useReplyStore from "../../../../stores/replyStore";
import { MessagePayload } from "../../../../utils/customTypes";
import { getTimeWithHHmmFormat } from "../../../../utils/time";
import ProfilePicture from "../../../reuseable/ProfilePicture";
import ChatBubbleMenu from "./ChatBubbleMenu";

type ChatMessageOuterPartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    thisMessageFromThisClient: boolean;
};

function ChatMessageOuterPart(props: ChatMessageOuterPartProps) {
    const [showMenu, setShowMenu] = useState(false);
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) => c.id === props.messagePayload.users.id
            )?.clientColor
    );

    function activateReplyMessage() {
        useReplyStore.getState().setReplyMessage({
            id: props.messagePayload.messageType.messageId,
            senderId: props.messagePayload.users.id,
            username: props.messagePayload.users.username,
            time: getTimeWithHHmmFormat(new Date()),
            message: props.messagePayload.messageType.message,
        });
    }
    return (
        <>
            <div
                onClick={() => setShowMenu(!showMenu)}
                className="relative mx-2 flex flex-col items-center"
            >
                <ProfilePicture
                    clientId={props.messagePayload.users.id}
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
                    thisMessageFromThisClient={props.thisMessageFromThisClient}
                    activateReplyMessage={activateReplyMessage}
                />
            </div>
        </>
    );
}

export default ChatMessageOuterPart;
