import { create, type StoreApi, type UseBoundStore } from "zustand";

type DoNotDisturbStore = {
	doNotDisturb: boolean;
	setDoNotDisturb: (value: boolean) => void;
	timeoutId?: NodeJS.Timeout;
};

const useDoNotDisturbStore: UseBoundStore<StoreApi<DoNotDisturbStore>> =
	create<DoNotDisturbStore>((set, get) => ({
		doNotDisturb: false,
		timeoutId: undefined,
		setDoNotDisturb: (value: boolean) => {
			const currentTimeoutId = get().timeoutId;
			if (currentTimeoutId) {
				clearTimeout(currentTimeoutId);
			}
			set({ doNotDisturb: value });
			if (value) {
				const timeoutId = setTimeout(
					() => set({ doNotDisturb: false, timeoutId: undefined }),
					300 * 1000,
				);
				set({ timeoutId });
			} else {
				set({ timeoutId: undefined });
			}
		},
	}));

export { useDoNotDisturbStore };
