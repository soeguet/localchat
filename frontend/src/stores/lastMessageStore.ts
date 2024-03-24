import { StoreApi, UseBoundStore, create } from "zustand";

type LastMessageStore = {
    lastMessageId: string;
    lastMessageTime: string;
    setLastMessage: (id: string, messageTime: string) => void;
};

const useLastMessageStore: UseBoundStore<StoreApi<LastMessageStore>> = create<LastMessageStore>((set) => ({
    lastMessageId: "",
    lastMessageTime: "",
    setLastMessage: (id, messageTime) => set({ lastMessageId: id, lastMessageTime: messageTime }),
}));

export default useLastMessageStore;
