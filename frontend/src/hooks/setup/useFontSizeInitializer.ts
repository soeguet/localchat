import {useFontSizeStore} from "../../stores/fontSizeStore";
import {useEffect} from "react";

export function useFontSizeInitializer() {

    const fontSize = useFontSizeStore((state) => state.fontSize);

    useEffect(() => {
        document.documentElement.style.setProperty("--user-font-size", `${fontSize}px`);
    }, [fontSize]);

}