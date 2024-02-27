import {create, StoreApi, UseBoundStore} from "zustand";

type DoNotDisturbStore = {
    doNotDisturb: boolean;
    setDoNotDisturb: (value: boolean) => void;
};
const useDoNotDisturbStore: UseBoundStore<StoreApi<DoNotDisturbStore>> = create<DoNotDisturbStore>((set) => ({
    doNotDisturb: false,
    setDoNotDisturb: (value: boolean) => set({doNotDisturb: value}),
}));

export default useDoNotDisturbStore;