import { StoreApi, UseBoundStore, create } from "zustand";

export type EnvironmentStoreType = {
    socketIp: string;
    socketPort: string;
    clientOs: string;
    setSocketIp: (newIp: string) => void;
    setSocketPort: (newPort: string) => void;
    setClientOs: (newOs: string) => void;
};

const useEnvironmentStore: UseBoundStore<StoreApi<EnvironmentStoreType>> = create<EnvironmentStoreType>((set) => ({
    socketIp: "",
    socketPort: "",
    clientOs: "",
    setSocketIp: (newIp: string) => set({ socketIp: newIp }),
    setSocketPort: (newPort: string) => set({ socketPort: newPort }),
    setClientOs: (newOs: string) => set({ clientOs: newOs }),
}));

export default useEnvironmentStore;
