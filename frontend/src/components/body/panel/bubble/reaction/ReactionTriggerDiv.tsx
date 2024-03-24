import React, {lazy, Suspense, useState} from "react";
import useWebsocketStore from "../../../../../stores/websocketStore";
import {MessagePayload, PayloadSubType} from "../../../../../utils/customTypes";
import {generateSimpleId} from "../../../../../utils/functionality";
import useUserStore from "../../../../../stores/userStore";
import {useTranslation} from "react-i18next";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

type ReactionTriggerDivProps = {
    messagePayload: MessagePayload;
};

function ReactionTriggerDiv({messagePayload}: ReactionTriggerDivProps) {
    const {t} = useTranslation()
    const [reactionOpen, setReactionOpen] = useState(false);
    const [reactionVisible, setReactionVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messageFromThisClient = messagePayload.clientType.clientDbId === useUserStore.getState().myId;

    const handleOpenEmojiPicker = () => {
        setIsLoading(true);
        setReactionOpen(!reactionOpen);
        setTimeout(() => setIsLoading(false), 20);
    };

    return (
        <>
            <div className="px-1 self-stretch" onMouseEnter={() => setReactionVisible(true)}
                 onMouseLeave={() => {
                     setReactionVisible(false);
                     setReactionOpen(false);
                 }}>
                {
                    reactionVisible && (
                        reactionOpen
                            ? isLoading
                                ? <div>Loading...</div>
                                : (
                                    <Suspense fallback={<div>
                                        {t("loading_label")}
                                    </div>}>

                                        <div className="relative">
                                            <div className={`absolute ${
                                                messageFromThisClient
                                                    ? "-translate-x-full pr-3"
                                                    : ""
                                            } z-50`}>
                                                <EmojiPicker
                                                reactionsDefaultOpen={true}
                                                allowExpandReactions={true}
                                                onReactionClick={(emoji) => {
                                                    useWebsocketStore.getState().ws?.send(JSON.stringify({
                                                        payloadType: PayloadSubType.reaction,
                                                        reactionDbId: generateSimpleId(),
                                                        reactionMessageId: messagePayload.messageType.messageDbId,
                                                        reactionContext: emoji.emoji,
                                                        reactionClientId: useUserStore.getState().myId,
                                                    }));
                                                }}
                                                onEmojiClick={(emoji) => {
                                                    useWebsocketStore.getState().ws?.send(JSON.stringify({
                                                        payloadType: PayloadSubType.reaction,
                                                        reactionDbId: generateSimpleId(),
                                                        reactionMessageId: messagePayload.messageType.messageDbId,
                                                        reactionContext: emoji.emoji,
                                                        reactionClientId: useUserStore.getState().myId,
                                                    }));
                                                }}
                                            />
                                            </div>
                                        </div>
                                    </Suspense>
                                )
                            : (
                                <div
                                    className="p-2 px-3 cursor-pointer text-xs rounded-full bg-gray-200 border-gray border-2"
                                    onClick={handleOpenEmojiPicker}
                                >😁
                                </div>
                            )
                    )
                }
            </div>
        </>
    );
}

export default ReactionTriggerDiv;