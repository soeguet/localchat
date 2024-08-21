import { useRefStore } from "../../stores/refStore";
import { useGuiHasFocusStore } from "../../stores/guiHasFocusStore";
import { useUserStore } from "../../stores/userStore";

export async function checkIfScrollToBottomIsNeeded(id: string) {

	const clientDbId = useUserStore.getState().myId;

	if (id === clientDbId) {
		return true;
	}

	const guiHasFocus = useGuiHasFocusStore.getState().guiHasFocus;
	if (!guiHasFocus) {
		// EXPERIMENTAL -- scroll to bottom, even though the gui does not have focus // if bottomRef is visible
		if (useRefStore.getState().chatBottomRefVisible) {
			await scrollToBottom();
		}

		return false;
	}

	return useRefStore.getState().chatBottomRefVisible;
}

export async function scrollToBottom(): Promise<void> {
	const chatBottomRef = useRefStore.getState().chatBottomRef;
	chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
}