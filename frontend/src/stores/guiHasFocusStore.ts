import { create } from "zustand";

type GuiHasFocusStore = {
    guiHasFocus: boolean;
    setGuiHasFocus: (hasFocus: boolean) => void;
};

const useGuiHasFocusStore = create<GuiHasFocusStore>((set) => ({
    guiHasFocus: false,
    setGuiHasFocus: (hasFocus: boolean) => set({ guiHasFocus: hasFocus }),
}));

export default useGuiHasFocusStore;
