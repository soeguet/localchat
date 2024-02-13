import { UseBoundStore, StoreApi, create } from "zustand";
import { EnvVarsState, EnvVars } from "../utils/customTypes";


/**
 * A custom hook that creates a Zustand store for managing environment variables.
 *
 * @returns The state and actions of the environment variables store.
 */
const useEnvVarsStore:UseBoundStore<StoreApi<EnvVarsState>> = create<EnvVarsState>((set) => ({
    zustandVar: null,
    setEnvVars: (newEnvVars: EnvVars|null) => set(() => ({ zustandVar: newEnvVars })),
    checkIfAllEnvVarsAreSet: () => {
        const zustandVar:EnvVars|null = useEnvVarsStore.getState().zustandVar;

        if (zustandVar === null) {
            return false;
        }
        const allGood:boolean =
            zustandVar.username !== "" && zustandVar.ip !== "" && zustandVar.port !== "" && zustandVar.os !== "";

        return allGood;
    },
    saveVarsLocally: () => {
        // TODO persist vars
        console.log("Saving vars locally");
    },
}));

export default useEnvVarsStore;
