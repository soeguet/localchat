import { lazy, useState } from "react";
import useReactionMenuStore from "../../../../../stores/reactionMenuStore";
import { useUserStore } from "../../../../../stores/userStore";
import { MessagePayload } from "../../../../../utils/customTypes";
import { ExpandEmojiSymbol } from "../../../../svgs/emoji/ExpandEmojiSymbol";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

type ReactionTriggerDivProps = {
    messagePayload: MessagePayload;
};

// TODO clean up this mess
function ReactionTriggerDiv({ messagePayload }: ReactionTriggerDivProps) {
    const [menuSvgDiabled, setMenuSvgDisabled] = useState("");

    const messageFromThisClient =
        messagePayload.clientType.clientDbId === useUserStore.getState().myId;

    function onClickMenu(e: React.MouseEvent<HTMLDivElement>) {
        setMenuSvgDisabled("disabled opacity-0 ");

        const timer = window.setTimeout(() => {
            setMenuSvgDisabled("opacity-100");

            return () => {
                clearTimeout(timer);
            };
        }, 5000);
        handleOpenEmojiPicker(e);
    }

    function handleOpenEmojiPicker(e: React.MouseEvent<HTMLDivElement>) {
        if (useReactionMenuStore.getState().isOpen) {
            return;
        }

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
                className="cursor-pointer opacity-0 transition-all duration-500 ease-in-out group-hover/message:opacity-100"
                onClick={onClickMenu}
            >
                <ExpandEmojiSymbol />
            </div>
        </>
    );
}

export { ReactionTriggerDiv };
