import { create, StoreApi, UseBoundStore } from "zustand";
import { MessagePayload } from "../utils/customTypes";

type MessageMapStore = {
    messageMap: Map<string, MessagePayload>;
    setMessageMap: (messageMap: Map<string, MessagePayload>) => void;
    onMessage: (message: MessagePayload) => void;
};

const useMessageMapStore: UseBoundStore<StoreApi<MessageMapStore>> =
    create<MessageMapStore>((set) => ({
        messageMap: new Map<string, MessagePayload>(),
        setMessageMap: (messageMap: Map<string, MessagePayload>) =>
            set(() => ({ messageMap: messageMap })),
        onMessage: (message: MessagePayload) =>
            set((state) => {

                // console.log("STATE!!");
                // console.log(state);
                // console.log(message);
                if (message === undefined) {
                    return state;
                }
                if (message.messageType === undefined) {
                    return state;
                }
                if (message.messageType.messageDbId === undefined) {
                    return state;
                }
                if (state.messageMap.has(message.messageType.messageDbId)) {
                    return state;
                }
                // new map needed!
                const newMap = new Map(state.messageMap);
                // console.log("message", message);

                newMap.set(message.messageType.messageDbId, message);

                return { messageMap: newMap };
            }),
    }));

export default useMessageMapStore;
