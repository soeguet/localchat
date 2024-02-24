import { create } from "zustand";

type TypingStoreType = {
    typingClientIds: string[];
    addTypingClientId: (clientId: string) => void;
    removeTypingClientId: (clientId: string) => void;
};

const useTypingStore = create<TypingStoreType>((set) => ({
    typingClientIds: [],
    addTypingClientId: (clientId: string) =>
        set((state) => ({
            typingClientIds: state.typingClientIds.includes(clientId)
                ? state.typingClientIds
                : [...state.typingClientIds, clientId],
        })),
    removeTypingClientId: (clientId: string) =>
        set((state) => ({
            typingClientIds: state.typingClientIds.filter((id) => id !== clientId),
        })),
}));

export default useTypingStore;
