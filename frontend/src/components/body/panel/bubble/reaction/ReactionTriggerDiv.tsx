import React, {lazy, Suspense, useEffect, useState} from "react";
import useWebsocketStore from "../../../../../stores/websocketStore";
import {MessagePayload, PayloadSubType} from "../../../../../utils/customTypes";
import {generateSimpleId} from "../../../../../utils/functionality";
import useUserStore from "../../../../../stores/userStore";
const EmojiPicker = lazy(() => import("emoji-picker-react"));

type ReactionTriggerDivProps = {
    messagePayload: MessagePayload;
};

function ReactionTriggerDiv(props: ReactionTriggerDivProps) {
    const [reactionOpen, setReactionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [reactionVisible, setReactionVisible] = useState(false);

    useEffect(() => {
        if (reactionOpen) {
            setIsLoading(true);
        }
    }, [reactionOpen]);

    useEffect(() => {
        if (reactionOpen && isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 10); // Adjust the delay as needed

            return () => clearTimeout(timer);
        }
    }, [reactionOpen, isLoading]);

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
                            ?
                            (
                                <Suspense fallback={<div>Loading...</div>}>

                                    <EmojiPicker reactionsDefaultOpen={true}
                                        allowExpandReactions={false}
                                        onReactionClick={(emoji) => {
                                            useWebsocketStore.getState().ws?.send(JSON.stringify({
                                                payloadType: PayloadSubType.reaction,
                                                reactionDbId: generateSimpleId(),
                                                reactionMessageId: props.messagePayload.messageType.messageDbId,
                                                reactionContext: emoji.emoji,
                                                reactionClientId: useUserStore.getState().myId,
                                            }));
                                        }}/>
                                    
                                </Suspense>
                            ) 
                            :
                            (
                                
                                <div
                                    className="p-2 px-3 cursor-pointer text-xs rounded-full bg-gray-200 border-gray border-2"
                                    onClick={() => setReactionOpen(!reactionOpen)}
                                >😁
                                </div>
                            ))
                }
            </div>
            {
                
            }
        </>
    );
}

export default ReactionTriggerDiv;