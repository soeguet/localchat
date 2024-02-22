import { StoreApi, UseBoundStore, create } from "zustand";
import { UserDatabaseRow } from "../utils/customTypes";

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
    clients: UserDatabaseRow[];
    setClients: (clients: UserDatabaseRow[]) => void;
    getClientById: (id: string) => UserDatabaseRow;
};

const useClientsStore: UseBoundStore<StoreApi<ClientStore>> = create<ClientStore>((set) => ({
    clients: [],
    setClients: (clients) => set({ clients }),
    getClientById: (id: string) => {
        const client = useClientsStore.getState().clients.find((client) => client.id === id);
        if (client) {
            return client;
        } else {
            throw new Error(`Client with id ${id} not found`);
        }
    },
}));

export default useClientsStore;
