import type { RefObject } from "react";
import { create } from "zustand";

type RefStore = {
	chatBottomRefVisible: boolean;
	setChatBottomRefVisible: (visible: boolean) => void;
	chatBottomRef: RefObject<HTMLDivElement> | null;
	setChatBottomRef: (ref: RefObject<HTMLDivElement> | null) => void;
	chatContainerRef: RefObject<HTMLDivElement> | null;
	setChatContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
};

const useRefStore = create<RefStore>((set) => ({
	chatBottomRef: { current: null },

	setChatBottomRef: (ref: RefObject<HTMLDivElement> | null) =>
		set({ chatBottomRef: ref }),

	chatBottomRefVisible: false,

	setChatBottomRefVisible: (visible: boolean) =>
		set({ chatBottomRefVisible: visible }),

	chatContainerRef: { current: null },

	setChatContainerRef: (ref: RefObject<HTMLDivElement> | null) =>
		set({ chatContainerRef: ref }),
}));

export { useRefStore };
