import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { ClientEntity, Hash } from "../utils/customTypes";

/**
 * Represents a registered user.
 */
export type ClientStore = {
	clients: ClientEntity[];
	setClients: (clients: ClientEntity[]) => void;
	getClientById: (id: string) => ClientEntity | undefined;
	getClientHashById: (id: string) => Hash | undefined;
};

const useClientStore: UseBoundStore<StoreApi<ClientStore>> =
	create<ClientStore>((set) => ({
		clients: [],
		setClients: (clients) => set({ clients }),
		getClientById: (id: string): ClientEntity | undefined => {
			const clients = useClientStore.getState().clients;
			return clients.find((client) => client.clientDbId === id);
		},
		getClientHashById: (id: string): Hash | undefined => {
			const clients = useClientStore.getState().clients;
			const clientProfileImage = clients.find((client) => client.clientDbId === id)
				?.clientProfileImage;
			if (clientProfileImage === null || clientProfileImage === undefined) {
				return undefined;
			}
			return clientProfileImage;
		},
	}));

// export const getClientById = (id: string): ClientEntity | undefined => {
// 	const clients = useClientStore.getState().clients;
// 	return clients.find((client) => client.clientDbId === id);
// };

export { useClientStore };