import useReactionMenuStore from "../../../../../stores/reactionMenuStore";
import type { MessagePayload } from "../../../../../utils/types/customTypes";
import { ExpandEmojiSymbol } from "../../../../svgs/emoji/ExpandEmojiSymbol";
import React from "react";
type ReactionTriggerDivProps = {
	messagePayload: MessagePayload;
};

function ReactionTriggerDiv({ messagePayload }: ReactionTriggerDivProps) {
	function onClickMenu(e: React.MouseEvent<HTMLDivElement>) {
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