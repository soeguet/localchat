import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { memo, useEffect, useRef, useState } from "react";
import type React from "react";
import { EmojiMenuSvg } from "../../svgs/input/EmojiMenuSvg";

type EmojiProps = {
	setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Emoji = memo((props: EmojiProps) => {
	const [emojiVisible, setEmojiVisible] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const emojiRef = useRef<HTMLDivElement>(null);

	/**
	 * Handles the click outside of the menu.
	 * @param event - The mouse event object.
	 */
	function handleClickOutside(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		if (
			emojiRef.current &&
			!emojiRef.current.contains(event.target as Node)
		) {
			const { left, top, right, bottom } =
				emojiRef.current.getBoundingClientRect();
			const { clientX, clientY } = event;

			if (
				clientX < left ||
				clientX > right ||
				clientY < top ||
				clientY > bottom
			) {
				setEmojiVisible(!emojiVisible);
			}
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (emojiVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [emojiVisible]);

	const handleEmojiClick = (emojiData: EmojiClickData) => {
		props.setMessage((prev) => prev + emojiData.emoji);
	};

	return (
		<>
			<div
				className="flex h-full cursor-pointer items-center"
				onClick={(event) => {
					setEmojiVisible(true);
					setPosition({ x: event.clientX, y: event.clientY });
				}}>
				<EmojiMenuSvg />
			</div>

			<div ref={emojiRef} className="fixed z-30 mb-24">
				<EmojiPicker
					lazyLoadEmojis={true}
					open={emojiVisible}
					onEmojiClick={handleEmojiClick}
					style={{
						position: "fixed",
						left: position.x,
						top: position.y - 460,
						zIndex: 20,
					}}
				/>
			</div>
		</>
	);
});

Emoji.displayName = "Emoji";

export { Emoji };
