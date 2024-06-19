import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { PayloadSubType } from "../utils/customTypes";

type EmergencyStoreType = {
	emergencyInitiatorId: string;
	setEmergencyInitiatorId: (emergencyInitiatorId: string) => void;
	emergency: boolean;
	setEmergency: (emergency: boolean) => void;
	chatVisible: boolean;
	setChatVisible: (chatVisible: boolean) => void;
};

const useEmergencyStore: UseBoundStore<StoreApi<EmergencyStoreType>> =
	create<EmergencyStoreType>((set) => ({
		emergencyInitiatorId: "",
		setEmergencyInitiatorId: (emergencyInitiatorId: string) =>
			set({ emergencyInitiatorId: emergencyInitiatorId }),
		emergency: false,
		setEmergency: (emergency: boolean) => set({ emergency: emergency }),
		chatVisible: false,
		setChatVisible: (chatVisible: boolean) =>
			set({ chatVisible: chatVisible }),
	}));

export { useEmergencyStore };
