import React from "react";
import "./ChatMessageUnit.css";
import useUserStore from "../../../../stores/userStore";
import {MessagePayload, PayloadSubType} from "../../../../utils/customTypes";
import ChatMessageBubblePart from "./ChatMessageBubblePart";
import ChatMessageOuterPart from "./ChatMessageOuterPart";
import useWebsocketStore from "../../../../stores/websocketStore";
import {generateSimpleId} from "../../../../utils/functionality";

type MessageProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
};

function ChatMessageUnit(props: MessageProps) {
    console.log("ChatMessageUnit", props.messagePayload);
    const thisMessageSenderClientId = props.messagePayload.clientType.clientDbId;
    const thisMessageFromThisClient =
        thisMessageSenderClientId === useUserStore.getState().myId;

    const messageOnWhichSideAligned = `${thisMessageFromThisClient ? "flex-row-reverse" : ""}`;
    const howMuchMarginToMessageAbove = `${!props.lastMessageFromThisClientId && !props.lastMessageTimestampSameAsThisOne ? "mt-3" : "mt-1"}`;

    return (
        <div
            className={`flex items-end ${messageOnWhichSideAligned} ${howMuchMarginToMessageAbove}`}
        >
            <ChatMessageOuterPart
                messagePayload={props.messagePayload}
                lastMessageFromThisClientId={props.lastMessageFromThisClientId}
                thisMessageFromThisClient={thisMessageFromThisClient}
            />
            <ChatMessageBubblePart
                messagePayload={props.messagePayload}
                lastMessageFromThisClientId={props.lastMessageFromThisClientId}
                lastMessageTimestampSameAsThisOne={
                    props.lastMessageTimestampSameAsThisOne
                }
            />

            <button className="bg-red-400 p-2 rounded-2xl border-2"
                onClick={() => {

                    useWebsocketStore.getState().ws?.send(JSON.stringify({
                        payloadType: PayloadSubType.reaction,
                        reactionDbId: generateSimpleId(),
                        reactionMessageId: props.messagePayload.messageType.messageDbId,
                        reactionContext: "😂",
                        reactionClientId: useUserStore.getState().myId,
                    }));
                }
                }

            >asd
            </button>
        </div>
    );
}

export default React.memo(ChatMessageUnit);