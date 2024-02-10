// store/envVarsStore.ts
import { create } from "zustand";
import { EnvVars, EnvVarsState } from "../utils/types";

export const useEnvVarsStore:any = create<EnvVarsState>()((set) => ({
    zustandVar: {
        username: "",
        ip: "",
        port: "",
        os: "",
    },
    setEnvVars: (newEnvVars) => set(() => ({ zustandVar: newEnvVars })),
    checkIfAllEnvVarsAreSet: () => {
        const { zustandVar } = useEnvVarsStore.getState();

        const allGood =             zustandVar.username !== "" &&
        zustandVar.ip !== "" &&
        zustandVar.port !== "" &&
        zustandVar.os !== "";

        console.log("allGood", allGood);
        return allGood;
    },
}));
