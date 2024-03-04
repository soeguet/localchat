import { useEffect, useRef } from "react";
import useGuiHasFocusStore from "../../stores/guiHasFocusStore";

export function useWindowFocussedListener() {
    // window focus state
    const guiHasFocus = useRef(true);
    useEffect(() => {
        const handleFocus = () => {
            //console.log("GUI now has focus");
            useGuiHasFocusStore.getState().setGuiHasFocus(true);
            guiHasFocus.current = true;
        };

        const handleBlur = () => {
            useGuiHasFocusStore.getState().setGuiHasFocus(false);
            //console.log("GUI lost focus");
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
