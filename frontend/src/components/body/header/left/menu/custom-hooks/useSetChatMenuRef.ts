import {useRefStore} from "../../../../../../stores/refStore";
import React, {useEffect} from "react";

function useSetChatMenuRef(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        if (ref.current !== null) {
            useRefStore.getState().setChatMenuRef(ref);
        }
    }, []);
}

export { useSetChatMenuRef };