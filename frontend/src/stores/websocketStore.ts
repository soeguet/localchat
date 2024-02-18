import { StoreApi, UseBoundStore, create } from "zustand";

type WebsocketStoreType = {
    ws: WebSocket | null;
    setWs: (ws: WebSocket | null) => void;
};

const useWebsocketStore: UseBoundStore<StoreApi<WebsocketStoreType>> = create<WebsocketStoreType>((set) => ({
    ws: null,
    setWs: (ws) => set({ ws }),
}));

export default useWebsocketStore;
