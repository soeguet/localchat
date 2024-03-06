import useChatBottomRefVisibleStore from "../stores/chatBottomRefVisibleStore";
import useGuiHasFocusStore from "../stores/guiHasFocusStore";
import {scrollToBottom} from "./functionality";
import useUserStore from "../stores/userStore";

export function checkIfScrollToBottomIsNeeded(messageId: string) {

    const clientId = useUserStore.getState().myId;

    if (messageId === clientId) {
        return true;
    }

    const guiHasFocus = useGuiHasFocusStore.getState().guiHasFocus;
    //console.log("guiHasFocus", guiHasFocus);
    if (!guiHasFocus) {

        // EXPERIMENTAL -- scroll to bottom, even though the gui does not have focus // if bottomRef is visible
        if (useChatBottomRefVisibleStore.getState().chatBottomRefVisible) {
            scrollToBottom();
        }

        return false;
    }

    return useChatBottomRefVisibleStore.getState().chatBottomRefVisible;
}
