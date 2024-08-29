import {create} from "zustand";
import {VersionEntity} from "../utils/types/customTypes";
import {errorLogger} from "../logger/errorLogger";

type VersionStoreProps = {
    major: number;
    minor: number;
    patch: number;
    needsUpdate: boolean;
    setVersion: (version: string) => void;
    checkForUpdate: (newVersion: VersionEntity) => void;
};

const useVersionStore = create<VersionStoreProps>((set, get) => ({
    major: 0,
    minor: 0,
    patch: 0,
    needsUpdate: false,

    setVersion: (version: string) => set(() => {
        const [major, minor, patch] = version.split(".").map(Number);

        if (isNaN(major) || isNaN(minor) || isNaN(patch) ||
            major === undefined || minor === undefined || patch === undefined ||
            (major === 0 && minor === 0 && patch === 0)) {
            console.error("Version is not valid");

            errorLogger.logError(new Error("Version is not valid"));
        }

        return {major, minor, patch};
    }),

    checkForUpdate: (newVersion: VersionEntity) => set((state) => {
        const needsUpdate =
            newVersion.major > state.major ||
            (newVersion.major === state.major && newVersion.minor > state.minor) ||
            (newVersion.major === state.major && newVersion.minor === state.minor && newVersion.patch > state.patch);

        if (needsUpdate) {
            return {major: newVersion.major, minor: newVersion.minor, patch: newVersion.patch, needsUpdate}
        }

        return state;
    }),
}));

export {useVersionStore};