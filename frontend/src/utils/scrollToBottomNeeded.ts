import useChatBottomRefVisibleStore from "../stores/chatBottomRefVisibleStore";
import useGuiHasFocusStore from "../stores/guiHasFocusStore";

export function checkIfScrollToBottomIsNeeded() {
    const guiHasFocus = useGuiHasFocusStore.getState().guiHasFocus;
    //console.log("guiHasFocus", guiHasFocus);
    if (!guiHasFocus) {
        return false;
    }

    const chatBottomRefVisible = useChatBottomRefVisibleStore.getState().chatBottomRefVisible;
    if (!chatBottomRefVisible) {

        return false;
    }

    return true;
}
