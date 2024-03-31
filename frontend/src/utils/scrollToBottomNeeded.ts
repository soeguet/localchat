import useRefStore from "../stores/refStore";
import useGuiHasFocusStore from "../stores/guiHasFocusStore";
import { scrollToBottom } from "./functionality";
import useUserStore from "../stores/userStore";

export function checkIfScrollToBottomIsNeeded(id: string) {
    const clientDbId = useUserStore.getState().myId;

    if (id === clientDbId) {
        return true;
    }

    const guiHasFocus = useGuiHasFocusStore.getState().guiHasFocus;
    if (!guiHasFocus) {
        // EXPERIMENTAL -- scroll to bottom, even though the gui does not have focus // if bottomRef is visible
        if (useRefStore.getState().chatBottomRefVisible) {
            scrollToBottom();
        }

        return false;
    }

    return useRefStore.getState().chatBottomRefVisible;
}
