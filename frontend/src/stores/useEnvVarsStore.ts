// store/envVarsStore.ts
import { StoreApi, UseBoundStore, create } from "zustand";
import { EnvVarsState } from "../utils/customTypes";
import { EnvVars } from "../utils/customTypes";

export const useEnvVarsStore: UseBoundStore<StoreApi<EnvVarsState>> = create<EnvVarsState>()((set) => ({
    zustandVar: {
        username: "",
        ip: "",
        port: "",
        os: "",
    },
    setEnvVars: (newEnvVars: EnvVars) => set(() => ({ zustandVar: newEnvVars })),
    checkIfAllEnvVarsAreSet: () => {
        const { zustandVar } = useEnvVarsStore.getState();

        const allGood =
            zustandVar.username !== "" && zustandVar.ip !== "" && zustandVar.port !== "" && zustandVar.os !== "";

        console.log("allGood", allGood);
        return allGood;
    },
}));
