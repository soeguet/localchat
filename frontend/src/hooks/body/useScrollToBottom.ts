import React, {useEffect} from "react";
import useMessageMapStore from "../../stores/messageMapStore";

export function useScrollToBottom(ref: React.RefObject<HTMLDivElement>) {
    const messageMap = useMessageMapStore((state) => state.messageMap);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messageMap.size]);
}