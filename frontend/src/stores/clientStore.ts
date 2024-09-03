import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { ClientEntity } from "../utils/types/customTypes";

export type ClientStore = {
	clientMap: Map<string, ClientEntity>;
	setClientMap: (clientMap: Map<string, ClientEntity>) => void;
};

const useClientStore: UseBoundStore<StoreApi<ClientStore>> =
	create<ClientStore>((set) => ({
		clientMap: new Map<string, ClientEntity>(),
		setClientMap: (clientMap: Map<string, ClientEntity>) =>
			set({ clientMap: clientMap }),
	}));

export { useClientStore };