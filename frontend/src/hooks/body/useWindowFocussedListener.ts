import {useEffect, useRef} from "react";
import {useGuiHasFocusStore} from "../../stores/guiHasFocusStore";

export function useWindowFocussedListener() {
    // window focus state
    const guiHasFocus = useRef(true);
    useEffect(() => {
        const handleFocus = () => {
            useGuiHasFocusStore.getState().setGuiHasFocus(true);
            guiHasFocus.current = true;
        };

        const handleBlur = () => {
            useGuiHasFocusStore.getState().setGuiHasFocus(false);
            guiHasFocus.current = false;
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);
}