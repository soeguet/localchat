import { type StoreApi, type UseBoundStore, create } from "zustand";

type useStoreType = {
	emergency: boolean;
	setEmergency: (emergency: boolean) => void;
};

const useEmergencyStore: UseBoundStore<StoreApi<useStoreType>> =
	create<useStoreType>((set) => ({
		emergency: false,
		setEmergency: (emergency: boolean) => set({ emergency: emergency }),
	}));

export { useEmergencyStore };
