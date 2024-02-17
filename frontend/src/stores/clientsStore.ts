import { StoreApi, UseBoundStore, create } from "zustand";
import { RegisteredUser } from "../utils/customTypes";

export type ClientStore = {
    clients: RegisteredUser[];
    setClients: (clients: RegisteredUser[]) => void;
};

const clientsStore: UseBoundStore<StoreApi<ClientStore>> = create<ClientStore>((set) => ({
    clients: [],
    setClients: (clients) => set({ clients }),
}));

export default clientsStore;
