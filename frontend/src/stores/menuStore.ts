import { type StoreApi, type UseBoundStore, create } from "zustand";

type useMenuStoreType = {
	menuOpen: boolean;
	setMenuOpen: (menuOpen: boolean) => void;
};

const useMenuStore: UseBoundStore<StoreApi<useMenuStoreType>> =
	create<useMenuStoreType>((set) => ({
		menuOpen: false,
		setMenuOpen: (menuOpen: boolean) => set({ menuOpen: menuOpen }),
	}));

export { useMenuStore };
