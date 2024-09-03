import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { ClientEntity } from "../utils/types/customTypes";

export type UserStore = {
	myId: string;
	setMyId: (id: string) => void;

	myUsername: string;
	setMyUsername: (username: string) => void;

	myColor: string;
	setMyColor: (color: string) => void;

	myProfilePictureHash: string;
	setMyProfilePictureHash: (hash: string) => void;

	myProfilePictureBase64: string;
	setMyProfilePictureBase64: (base64: string) => void;

	socketIp: string;
	setSocketIp: (newIp: string) => void;

	socketPort: string;
	setSocketPort: (newPort: string) => void;

	availability: boolean;
	setAvailability: (availability: boolean) => void;

	environment: string;
	setEnvironment: (environment: string) => void;
};

const useUserStore: UseBoundStore<StoreApi<UserStore>> = create((set) => ({
	myId: "",
	setMyId: (id: string) => set({ myId: id }),

	myUsername: "",
	setMyUsername: (username: string) => set({ myUsername: username }),

	myColor: "",
	setMyColor: (color: string) => set({ myColor: color }),

	myProfilePictureHash: "",
	setMyProfilePictureHash: (hash: string) =>
		set({ myProfilePictureHash: hash }),

	myProfilePictureBase64: "",
	setMyProfilePictureBase64: (base64: string) =>
		set({ myProfilePictureBase64: base64 }),

	socketIp: "",
	setSocketIp: (newIp: string) => set({ socketIp: newIp }),

	socketPort: "",
	setSocketPort: (newPort: string) => set({ socketPort: newPort }),

	availability: true,
	setAvailability: (availability: boolean) =>
		set({ availability: availability }),

	environment: "",
	setEnvironment: (environment: string) => set({ environment: environment }),
}));

export { useUserStore };