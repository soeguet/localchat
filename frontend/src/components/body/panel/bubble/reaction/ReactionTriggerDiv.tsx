import React, {lazy, useState, useEffect, Suspense} from "react";
import useWebsocketStore from "../../../../../stores/websocketStore";
import { MessagePayload, PayloadSubType } from "../../../../../utils/customTypes";
import { generateSimpleId } from "../../../../../utils/functionality";
import useUserStore from "../../../../../stores/userStore";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

type ReactionTriggerDivProps = {
    messagePayload: MessagePayload;
};

function ReactionTriggerDiv({ messagePayload }: ReactionTriggerDivProps) {
    const [reactionOpen, setReactionOpen] = useState(false);
    const [reactionVisible, setReactionVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <EmojiPicker
                                            reactionsDefaultOpen={true}
                                            allowExpandReactions={false}
                                            onReactionClick={(emoji) => {
                                                useWebsocketStore.getState().ws?.send(JSON.stringify({
                                                    payloadType: PayloadSubType.reaction,
                                                    reactionDbId: generateSimpleId(),
                                                    reactionMessageId: messagePayload.messageType.messageDbId,
                                                    reactionContext: emoji.emoji,
                                                    reactionClientId: useUserStore.getState().myId,
                                                }));
                                            }}/>
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