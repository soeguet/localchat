import { type StoreApi, type UseBoundStore, create } from "zustand";

type WebsocketStoreType = {
	ws: WebSocket | null;
	setWs: (ws: WebSocket | null) => void;
	isConnected: boolean;
	setIsConnected: (state: boolean) => void;

	getNullSafeWebsocket: () => WebSocket;
};

const useWebsocketStore: UseBoundStore<StoreApi<WebsocketStoreType>> =
	create<WebsocketStoreType>((set) => ({
		ws: null,
		setWs: (ws) => set({ ws }),
		isConnected: false,
		setIsConnected: (state: boolean) => set({ isConnected: state }),

		getNullSafeWebsocket: () => {
			const ws = useWebsocketStore.getState().ws;
			if (ws === null) {
				console.error("Websocket is null");
				throw new Error("Websocket is null");
			}
			return ws;
		},
	}));

export { useWebsocketStore };