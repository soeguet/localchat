import EmojiPicker from "emoji-picker-react";
import useReactionMenuStore from "../../stores/reactionMenuStore";
import { useEffect, useRef } from "react";
import { handleClickOutsideOfDiv } from "../../utils/gui/handleClickOutsideOfDiv";
import { useWebsocketStore } from "../../stores/websocketStore";
import { useUserStore } from "../../stores/userStore";
import { generateSimpleId } from "../../utils/helper/functionality";
import {PayloadSubTypeEnum} from "../../utils/types/customTypes";

function ReactionModal() {
	const isOpen = useReactionMenuStore((state) => state.isOpen);
	const setIsOpen = useReactionMenuStore((state) => state.setIsOpen);
	const position = useReactionMenuStore((state) => state.position);

	const ref = useRef(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(ref, e, setIsOpen),
			);
		}

		return () => {
			document.removeEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(ref, e, setIsOpen),
			);
		};
	}, [isOpen]);

	const customEmojis = [
		"2764-fe0f",
		"1fae1",
		"1f440",
		"1f926-200d-2642-fe0f",
		"2705",
		"274c",
		"1f923",
	];

	const customEmojis2 = [
		"1f92e",
		"1f913",
		"1f632",
		"1f631",
		"1f44e",
		"1f44d",
		"1f611",
	];

	return (
		<>
			{isOpen && (
				<div
					ref={ref}
					className="absolute grid grid-rows-1"
					style={{
						top: position.y,
						left: position.x,
					}}>
					<EmojiPicker
						reactions={customEmojis}
						lazyLoadEmojis={true}
						allowExpandReactions={false}
						reactionsDefaultOpen={true}
						onReactionClick={(emoji) => {
							useWebsocketStore.getState().ws?.send(
								JSON.stringify({
									payloadType:
										PayloadSubTypeEnum.enum.reaction,
									reactionDbId: generateSimpleId(),
									reactionMessageId:
										useReactionMenuStore.getState()
											.messageDbId,
									reactionContext: emoji.emoji,
									reactionClientId:
										useUserStore.getState().myId,
								}),
							);
							useReactionMenuStore.getState().reset();
						}}
					/>
					<EmojiPicker
						reactions={customEmojis2}
						lazyLoadEmojis={true}
						allowExpandReactions={false}
						reactionsDefaultOpen={true}
						onReactionClick={(emoji) => {
							useWebsocketStore.getState().ws?.send(
								JSON.stringify({
									payloadType:
										PayloadSubTypeEnum.enum.reaction,
									reactionDbId: generateSimpleId(),
									reactionMessageId:
										useReactionMenuStore.getState()
											.messageDbId,
									reactionContext: emoji.emoji,
									reactionClientId:
										useUserStore.getState().myId,
								}),
							);
							useReactionMenuStore.getState().reset();
						}}
					/>
				</div>
			)}
		</>
	);
}

export { ReactionModal };