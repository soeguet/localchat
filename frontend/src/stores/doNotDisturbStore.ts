import {create, StoreApi, UseBoundStore} from "zustand";

type DoNotDisturbStore = {
    doNotDisturb: boolean;
    setDoNotDisturb: (value: boolean) => void;
    timeoutId?: NodeJS.Timeout;
};

const useDoNotDisturbStore: UseBoundStore<StoreApi<DoNotDisturbStore>> = create<DoNotDisturbStore>((set, get) => ({
    doNotDisturb: false,
    timeoutId: undefined,
    setDoNotDisturb: (value: boolean) => {
        const currentTimeoutId = get().timeoutId;
        console.log("currentTimeoutId", currentTimeoutId);
        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }
        set({doNotDisturb: value});
        console.log("useDoNotDisturbStore.getState().doNotDisturb", useDoNotDisturbStore.getState().doNotDisturb);
        if (value) {
            const timeoutId = setTimeout(() => set({doNotDisturb: false, timeoutId: undefined}), 300 * 1000);
            set({timeoutId});
        } else {
            set({timeoutId: undefined});
        }
    },
}));

export default useDoNotDisturbStore;