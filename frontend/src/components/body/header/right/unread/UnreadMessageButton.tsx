import { useUnseenMessageCountStore } from "../../../../../stores/unseenMessageCountStore";
import { scrollToBottom } from "../../../../../utils/gui/scrollToBottomNeeded";
import { UnreadMessagesSvg } from "../../../../svgs/messages/UnreadMessagesSvg";

function UnreadMessageButton() {
	const unseenMessageCount = useUnseenMessageCountStore(
		(state) => state.unseenMessageCount,
	);

	return (
		<>
			{unseenMessageCount > 0 && (
				<button
					type="button"
					data-testid="unread-message-button"
					onClick={async () => {
						await scrollToBottom();
					}}
					className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500">
					<UnreadMessagesSvg />
				</button>
			)}
		</>
	);
}

export { UnreadMessageButton };