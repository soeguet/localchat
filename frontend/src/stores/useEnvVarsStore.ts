// store/envVarsStore.ts
import { StoreApi, UseBoundStore, create } from "zustand";

/**
 * Represents the environment variables required for the application.
 */
export type EnvVars = {
    username: string;
    ip: string;
    port: string;
    os: string;
};

/**
 * Represents the state of environment variables in Zustand.
 */
export type EnvVarsState = {
    zustandVar: {
        username: string;
        ip: string;
        port: string;
        os: string;
    };
    setEnvVars: (newEnvVars: { username: string; ip: string; port: string; os: string }) => void;
    checkIfAllEnvVarsAreSet: () => boolean;
    saveVarsLocally: () => void;
};

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

        return allGood;
    },
    saveVarsLocally: () => {
        // const { zustandVar } = useEnvVarsStore.getState();
        // TODO persist vars
    },
}));
