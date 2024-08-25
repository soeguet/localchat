import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { ClientEntity, Hash } from "../utils/types/customTypes";

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
			const clientProfilePictureHash = clients.find((client) => client.clientDbId === id)
				?.clientProfilePictureHash;
			if (clientProfilePictureHash === null || clientProfilePictureHash === undefined) {
				return undefined;
			}
			return clientProfilePictureHash;
		},
	}));

// export const getClientById = (id: string): ClientEntity | undefined => {
// 	const clients = useClientStore.getState().clients;
// 	return clients.find((client) => client.clientDbId === id);
// };

export { useClientStore };