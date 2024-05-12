import { lazy, Suspense, useState } from "react";
import { useWebsocketStore } from "../../../../../stores/websocketStore";
import {
    MessagePayload,
    PayloadSubType,
} from "../../../../../utils/customTypes";
import { generateSimpleId } from "../../../../../utils/functionality";
import { useUserStore } from "../../../../../stores/userStore";
import { useTranslation } from "react-i18next";
import useReactionMenuStore from "../../../../../stores/reactionMenuStore";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

type ReactionTriggerDivProps = {
    messagePayload: MessagePayload;
};

function ReactionTriggerDiv({ messagePayload }: ReactionTriggerDivProps) {
    const { t } = useTranslation();
    const [reactionOpen, setReactionOpen] = useState(false);
    const [reactionVisible, setReactionVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messageFromThisClient =
        messagePayload.clientType.clientDbId === useUserStore.getState().myId;

    function handleOpenEmojiPicker(e: React.MouseEvent<HTMLDivElement>) {
        useReactionMenuStore.getState().setIsOpen(true);
        useReactionMenuStore.getState().setPosition({
            x: e.pageX - 324 / 2,
            y: e.pageY + 20,
        });
        useReactionMenuStore
            .getState()
            .setMessageDbId(messagePayload.messageType.messageDbId);
    }

    return (
        <>
            <div
                className="self-stretch px-1"
                onMouseEnter={() => setReactionVisible(true)}
                onMouseLeave={() => {
                    setReactionVisible(false);
                    setReactionOpen(false);
                }}
            >
                {reactionVisible &&
                    (reactionOpen ? (
                        isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <Suspense
                                fallback={<div>{t("loading_label")}</div>}
                            >
                                <div className="relative">
                                    <div
                                        className={`absolute ${
                                            messageFromThisClient
                                                ? "-translate-x-full pr-3"
                                                : ""
                                        } z-50`}
                                    >
                                        <EmojiPicker
                                            reactionsDefaultOpen={true}
                                            allowExpandReactions={true}
                                            onReactionClick={(emoji) => {
                                                useWebsocketStore
                                                    .getState()
                                                    .ws?.send(
                                                        JSON.stringify({
                                                            payloadType:
                                                                PayloadSubType.reaction,
                                                            reactionDbId:
                                                                generateSimpleId(),
                                                            reactionMessageId:
                                                                messagePayload
                                                                    .messageType
                                                                    .messageDbId,
                                                            reactionContext:
                                                                emoji.emoji,
                                                            reactionClientId:
                                                                useUserStore.getState()
                                                                    .myId,
                                                        })
                                                    );
                                            }}
                                            onEmojiClick={(emoji) => {
                                                useWebsocketStore
                                                    .getState()
                                                    .ws?.send(
                                                        JSON.stringify({
                                                            payloadType:
                                                                PayloadSubType.reaction,
                                                            reactionDbId:
                                                                generateSimpleId(),
                                                            reactionMessageId:
                                                                messagePayload
                                                                    .messageType
                                                                    .messageDbId,
                                                            reactionContext:
                                                                emoji.emoji,
                                                            reactionClientId:
                                                                useUserStore.getState()
                                                                    .myId,
                                                        })
                                                    );
                                            }}
                                        />
                                    </div>
                                </div>
                            </Suspense>
                        )
                    ) : (
                        <div
                            className="border-gray cursor-pointer rounded-full border-2 bg-gray-200 p-2 px-3 text-xs"
                            onClick={handleOpenEmojiPicker}
                        >
                            😁
                        </div>
                    ))}
            </div>
        </>
    );
}

export { ReactionTriggerDiv };
