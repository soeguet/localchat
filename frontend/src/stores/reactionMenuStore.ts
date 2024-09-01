import { type StoreApi, type UseBoundStore, create } from "zustand";

type useReactionMenuStoreType = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;

	messageDbId: string | null;
	setMessageDbId: (originId: string) => void;

	position: { x: number; y: number };
	setPosition: (position: { x: number; y: number }) => void;

	reset: () => void;
};

const useReactionMenuStore: UseBoundStore<StoreApi<useReactionMenuStoreType>> =
	create<useReactionMenuStoreType>((set) => ({
		isOpen: false,
		setIsOpen: (isOpen: boolean) => set({ isOpen }),

		messageDbId: null,
		setMessageDbId: (messageDbId: string) => set({ messageDbId }),

		position: { x: 0, y: 0 },
		setPosition: (position: { x: number; y: number }) => set({ position }),

		reset: () =>
			set({ isOpen: false, messageDbId: null, position: { x: 0, y: 0 } }),
	}));

export default useReactionMenuStore;