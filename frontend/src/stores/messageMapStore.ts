import {create, StoreApi, UseBoundStore} from "zustand";
import {MessagePayload} from "../utils/customTypes";

type MessageMapStore = {
    messageMap: Map<string, MessagePayload>;
    setMessageMap: (messageMap: Map<string, MessagePayload>) => void;
    onMessage: (message: MessagePayload) => void;
}

const useMessageMapStore: UseBoundStore<StoreApi<MessageMapStore>> = create<MessageMapStore>((set) => ({
    messageMap: new Map<string, MessagePayload>(),
    setMessageMap: (messageMap: Map<string, MessagePayload>) => set(() => ({messageMap: messageMap})),
    onMessage: (message: MessagePayload) => set((state) => {
        if (!state.messageMap.has(message.messageType.messageId)) {
            state.messageMap.set(message.messageType.messageId, message);
        }
        return {messageMap: state.messageMap};
    }),
}));

export default useMessageMapStore;