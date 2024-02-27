import { StoreApi, UseBoundStore, create } from "zustand";

type LastMessageStore = {
    lastMessageId: string;
    lastMessageTime: string;
    setLastMessage: (messageId: string, messageTime: string) => void;
};

const useLastMessageStore: UseBoundStore<StoreApi<LastMessageStore>> = create<LastMessageStore>((set) => ({
    lastMessageId: "",
    lastMessageTime: "",
    setLastMessage: (messageId, messageTime) => set({ lastMessageId: messageId, lastMessageTime: messageTime }),
}));

export default useLastMessageStore;
