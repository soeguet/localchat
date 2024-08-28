import { ScrollSymbolSvg } from "../../svgs/scroll/ScrollSymbolSvg";
import { useUnseenMessageCountStore } from "../../../stores/unseenMessageCountStore";
import { useRefStore } from "../../../stores/refStore";
import {useCallback, useEffect, useState} from "react";
import { debounce } from "../../../utils/socket/debounce";
import {useUserStore} from "../../../stores/userStore";
import {DEFAULT_HOVER_COLOR, DEFAULT_STROKE_COLOR} from "../../../utils/variables/variables";
import {scrollToBottom} from "../../../utils/gui/scrollToBottomNeeded";

function ScrollToBottomButton() {
	const [hover, setHover] = useState(false);
	const thisClientColor = useUserStore((state) => state.myColor);

	// socket state
	const chatBottomRefVisible = useRefStore(
		(state) => state.chatBottomRefVisible,
	);
	const setChatBottomRefVisible = useRefStore(
		(state) => state.setChatBottomRefVisible,
	);
	const chatContainerRef = useRefStore((state) => state.chatContainerRef);

	const handleScroll = useCallback(
		debounce(() => {
			if (!chatContainerRef) return;
			if (!chatContainerRef.current) return;

			const { scrollTop, scrollHeight, clientHeight } =
				chatContainerRef.current;
			if (scrollTop + clientHeight >= scrollHeight) {
				setChatBottomRefVisible(true);
			} else {
				setChatBottomRefVisible(false);
			}
		}, 250),
		// don't remove chatContainerRef as a dependency, else the button will not disappear
		[chatContainerRef],
	);

	useEffect(() => {
		if (!chatContainerRef) return;
		const element = chatContainerRef.current;
		if (element) {
			element.addEventListener("scroll", handleScroll);

			return () => {
				element.removeEventListener("scroll", handleScroll);
			};
		}
	}, [handleScroll]);

	const backgroundColor = thisClientColor ? thisClientColor : DEFAULT_HOVER_COLOR;

	return (
		<>
			{!chatBottomRefVisible && (
				<div
					className="relative max-h-0 -translate-y-12">
					<button
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
						onClick={async () => {
							await scrollToBottom();
							useUnseenMessageCountStore.getState().resetUnseenMessageCount();
						}}
						style={{
							borderColor: hover ? backgroundColor : DEFAULT_STROKE_COLOR,
							opacity: hover ? 1:0.7
						}}
						className="sticky left-full z-50 mr-6 flex size-10 max-w-xs transform animate-bounce items-center justify-center rounded-full border bg-gray-200 text-xs shadow transition duration-300 ease-in-out"
					>
						<ScrollSymbolSvg />
					</button>
				</div>
			)}
		</>
	);
}

export { ScrollToBottomButton };