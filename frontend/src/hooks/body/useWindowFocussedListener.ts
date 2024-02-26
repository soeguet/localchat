import {useEffect, useRef} from "react";

export function useWindowFocussedListener() {
    // window focus state
    const guiHasFocus = useRef(true);
    useEffect(() => {
        const handleFocus = () => {
            guiHasFocus.current = true;
        };

        const handleBlur = () => {
            guiHasFocus.current = false;
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    return guiHasFocus;
}