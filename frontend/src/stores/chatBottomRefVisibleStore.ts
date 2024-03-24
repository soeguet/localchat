import { RefObject } from "react";
import { create } from "zustand";

type ChatBottomRefVisibleStore = {
    chatBottomRefVisible: boolean;
    setChatBottomRefVisible: (visible: boolean) => void;
    chatBottomRef: React.RefObject<HTMLDivElement> | null; 
    setChatBottomRef: (ref: RefObject<HTMLDivElement> | null) => void;
};

export const useChatBottomRefVisibleStore = create<ChatBottomRefVisibleStore>((set) => ({
    chatBottomRef: {current:null},
    setChatBottomRef: (ref: RefObject<HTMLDivElement> | null) => set({ chatBottomRef: ref }),
    chatBottomRefVisible: false,
    setChatBottomRefVisible: (visible: boolean) => set({ chatBottomRefVisible: visible }),
}));

export default useChatBottomRefVisibleStore;
