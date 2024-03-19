import { StoreApi, UseBoundStore, create } from "zustand";
import { ClientEntity } from "../utils/customTypes";

/**
 * Represents a registered user.
 */
export type ClientStore = {
    clients: ClientEntity[];
    setClients: (clients: ClientEntity[]) => void;
};

const useClientStore: UseBoundStore<StoreApi<ClientStore>> =
    create<ClientStore>((set) => ({
        clients: [],
        setClients: (clients) => set({ clients }),
    }));

export const getClientById = (id: string): ClientEntity| undefined => {
    const clients = useClientStore.getState().clients;
    return clients.find((client) => client.clientId === id);
};

export default useClientStore;
