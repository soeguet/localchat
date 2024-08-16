import { useCallback, useState } from "react";
import {PayloadSubType, PayloadSubTypeEnum} from "../../utils/customTypes";
import { useUserStore } from "../../stores/userStore";
import { useWebsocketStore } from "../../stores/websocketStore";

export function useTypingHook() {
  const [typingTimeoutId, setTypingTimeoutId] = useState<number | null>(null);

  const websocket = useWebsocketStore((state) => state.ws);
  const clientDbId = useUserStore((state) => state.myId);

  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (websocket !== null) {
      websocket.send(
        JSON.stringify({
          payloadType: PayloadSubTypeEnum.enum.typing,
          clientDbId: clientDbId,
          isTyping: isTyping,
        }),
      );
    }
  }, []);

  return { typingTimeoutId, setTypingTimeoutId, sendTypingStatus };
}