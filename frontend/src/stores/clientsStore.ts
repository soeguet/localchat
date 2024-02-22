import { StoreApi, UseBoundStore, create } from "zustand";

/**
 * Represents a registered user.
 */
export type RegisteredUser = {
    id: string;
    username: string;
    clientColor: string;
    profilePhotoUrl: string;
};
export type ClientStore = {
    clients: RegisteredUser[];
    setClients: (clients: RegisteredUser[]) => void;
};

const useClientsStore: UseBoundStore<StoreApi<ClientStore>> = create<ClientStore>((set) => ({
    clients: [],
    setClients: (clients) => set({ clients }),
}));

export const getClientById = (id: string): RegisteredUser | undefined => {
    const clients = useClientsStore.getState().clients;
    return clients.find((client) => client.id === id);
};

export default useClientsStore;
