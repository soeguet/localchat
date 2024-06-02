import { useState } from "react";
import { useClientStore } from "../../../../stores/clientStore";
import { useReplyStore } from "../../../../stores/replyStore";
import type { MessagePayload } from "../../../../utils/customTypes";
import { getTimeWithHHmmFormat } from "../../../../utils/time";
import { ProfilePicture } from "../../../reuseable/ProfilePicture";
import { ChatBubbleMenu } from "./ChatBubbleMenu";
import { BubbleMessageMenuSvg } from "../../../svgs/bubble/BubbleMessageMenuSvg";
type ChatMessageOuterPartProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    thisMessageFromThisClient: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
    setEnableMessageEditingMode: (enable: boolean) => void;
};

function ChatMessageOuterPart(props: ChatMessageOuterPartProps) {
    const [showMenu, setShowMenu] = useState(false);
    const menuAlignment = props.thisMessageFromThisClient
        ? "left-0"
        : "right-0";
    const menuTopMargin = props.lastMessageTimestampSameAsThisOne
        ? "top-1"
        : "top-6";
    const clientColor = useClientStore(
        (state) =>
            state.clients.find(
                (c) =>
                    c.clientDbId === props.messagePayload.clientType.clientDbId
            )?.clientColor
    );

    function activateReplyMessage() {
        useReplyStore.getState().setReplyMessage({
            id: props.messagePayload.messageType.messageDbId,
            senderId: props.messagePayload.clientType.clientDbId,
            username:
                useClientStore
                    .getState()
                    .clients.find(
                        (c) =>
                            c.clientDbId ===
                            props.messagePayload.clientType.clientDbId
                    )?.clientUsername || "Unknown",
            time: getTimeWithHHmmFormat(new Date()),
            date: new Date().toDateString(),
            message: props.messagePayload.messageType.messageContext,
        });
    }
    return (
        <>
            <div
                onClick={() => setShowMenu(!showMenu)}
                onKeyUp={() => setShowMenu(!showMenu)}
                className="relative mx-2 flex cursor-pointer flex-col items-center self-stretch">
                <ProfilePicture
                    clientDbId={props.messagePayload.clientType.clientDbId}
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
                {props.lastMessageFromThisClientId && (
                    <div
                        className={`absolute ${menuAlignment} ${menuTopMargin} opacity-0 transition-all duration-500 ease-in-out group-hover/message:opacity-100`}>
                        <BubbleMessageMenuSvg />
                    </div>
                )}
                <ChatBubbleMenu
                    setEnableMessageEditingMode={
                        props.setEnableMessageEditingMode
                    }
                    messagePayload={props.messagePayload}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    thisMessageFromThisClient={props.thisMessageFromThisClient}
                    activateReplyMessage={activateReplyMessage}
                />
            </div>
        </>
    );
}

export { ChatMessageOuterPart };
