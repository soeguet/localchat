import { create } from "zustand";

type ChatBottomRefVisibleStore = {
    chatBottomRefVisible: boolean;
    setChatBottomRefVisible: (visible: boolean) => void;
};

const useChatBottomRefVisibleStore = create<ChatBottomRefVisibleStore>((set) => ({
    chatBottomRefVisible: false,
    setChatBottomRefVisible: (visible: boolean) => set({ chatBottomRefVisible: visible }),
}));

export default useChatBottomRefVisibleStore;
