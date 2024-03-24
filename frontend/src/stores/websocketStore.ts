import { StoreApi, UseBoundStore, create } from "zustand";

type WebsocketStoreType = {
    ws: WebSocket | null;
    setWs: (ws: WebSocket | null) => void;
    isConnected: boolean;
    setIsConnected: (state: boolean) => void;
};

const useWebsocketStore: UseBoundStore<StoreApi<WebsocketStoreType>> = create<WebsocketStoreType>((set) => ({
    ws: null,
    setWs: (ws) => set({ ws }),
    isConnected: false,
    setIsConnected: (state:boolean) => set({ isConnected: state }),
}));
export default useWebsocketStore;
