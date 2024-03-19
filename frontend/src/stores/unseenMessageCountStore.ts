import { create } from "zustand";

type UnseenMessageCountStore = {
    unseenMessageCount: number;
    incrementUnseenMessageCount: () => void;
    resetUnseenMessageCount: () => void;
    unseenMessagesIdList: string[];
    addMessageToUnseenMessagesList: (id: string) => void;
};

const useUnseenMessageCountStore = create<UnseenMessageCountStore>((set) => ({
    unseenMessageCount: 0,
    incrementUnseenMessageCount: () => set((state) => ({ unseenMessageCount: state.unseenMessageCount + 1 })),
    resetUnseenMessageCount: () => set({ unseenMessageCount: 0, unseenMessagesIdList: []}),
    unseenMessagesIdList: [],
    addMessageToUnseenMessagesList: (id: string) => set((state) => ({ unseenMessagesIdList: [...state.unseenMessagesIdList, id] })),
}));

export default useUnseenMessageCountStore;
