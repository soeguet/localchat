import { useEffect } from "react";

function useSetFontSizeLocalStorage(fontSize: number) {
    useEffect(() => {
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);
}

export default useSetFontSizeLocalStorage;
