import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {MessagePayload} from "../utils/customTypes";

type MessageMapStore = {
    messageMap: Map<string, MessagePayload>;
    setMessageMap: (messageMap: Map<string, MessagePayload>) => void;
    onMessage: (message: MessagePayload) => void;
    onUpdateMessage: (message: MessagePayload) => void;
};

const useMessageMapStore: UseBoundStore<StoreApi<MessageMapStore>> = create<MessageMapStore>((set) => ({

    messageMap: new Map<string, MessagePayload>(),

    setMessageMap: (messageMap: Map<string, MessagePayload>) => {
        set(() => ({messageMap: messageMap}))
    },

    onMessage: (message: MessagePayload) => {
        set((state) => {

            // new map needed!
            const newMap = new Map(state.messageMap);
            newMap.set(message.messageType.messageDbId, message);

            return {messageMap: newMap};
        })
    },

    onUpdateMessage: (message: MessagePayload) => {
        set((state) => {

            // new map needed!
            const newMap = new Map(state.messageMap);
            newMap.set(message.messageType.messageDbId, message);

            return {messageMap: newMap};
        })
    },
}));

export {useMessageMapStore};