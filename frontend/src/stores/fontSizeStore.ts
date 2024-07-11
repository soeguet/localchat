import { create } from "zustand";

interface FontSizeState {
	fontSize: number;
	setFontSize: (size: number) => void;
}

const useFontSizeStore = create<FontSizeState>((set) => ({
	fontSize: localStorage.getItem("fontSize")
		? Number(localStorage.getItem("fontSize"))
		: 16,
	setFontSize: (size) => set({ fontSize: size }),
}));

export { useFontSizeStore };
