import { create } from "zustand";

type UnseenMessageCountStore = {
    unseenMessageCount: number;
    incrementUnseenMessageCount: () => void;
    resetUnseenMessageCount: () => void;
};

const useUnseenMessageCountStore = create<UnseenMessageCountStore>((set) => ({
    unseenMessageCount: 10,
    incrementUnseenMessageCount: () => set((state) => ({ unseenMessageCount: state.unseenMessageCount + 1 })),
    resetUnseenMessageCount: () => set({ unseenMessageCount: 0 }),
}));

export default useUnseenMessageCountStore;
