import { useCallback, useState } from "react";
import { PayloadSubType } from "../../utils/customTypes";
import useUserStore from "../../stores/userStore";
import useWebsocketStore from "../../stores/websocketStore";

export function useTypingHook() {
    const [typingTimeoutId, setTypingTimeoutId] = useState<number | null>(null);

    const websocket = useWebsocketStore((state) => state.ws);
    const clientId = useUserStore((state) => state.myId);

    const sendTypingStatus = useCallback((isTyping: boolean) => {
        if (websocket !== null) {
            websocket.send(
                JSON.stringify({
                    payloadType: PayloadSubType.typing,
                    clientId: clientId,
                    isTyping: isTyping,
                })
            );
        }
    }, []);

    return { typingTimeoutId, setTypingTimeoutId, sendTypingStatus };
}
