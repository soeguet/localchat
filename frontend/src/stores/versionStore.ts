import { create } from "zustand";

type VersionStoreProps = {
    major: number;
    minor: number;
    patch: number;
    setVersion: (version: string) => void;
    needsUpdate: boolean;
    setNeedsUpdate: (needsUpdate: boolean) => void;
};

const useVersionStore = create<VersionStoreProps>((set) => ({

    major: 0,
    minor: 0,
    patch: 0,

    setVersion: (version: string) => set(() => {

        const [major, minor, patch] = version.split(".");

        const majorNumber = Number(major);
        const minorNumber = Number(minor);
        const patchNumber = Number(patch);

        if (isNaN(majorNumber) || isNaN(minorNumber) || isNaN(patchNumber)) {
            throw new Error("Version is not valid");
        }
        if (majorNumber === 0 && minorNumber === 0 && patchNumber === 0) {
            throw new Error("Version is not valid");
        }
        if( majorNumber === undefined || minorNumber === undefined || patchNumber === undefined) {
            throw new Error("Version is not valid");
        }

        return { major: majorNumber, minor: minorNumber, patch: patchNumber };

    }),

    needsUpdate: false,

    setNeedsUpdate: (needsUpdate: boolean) => set({ needsUpdate }),

}));

export { useVersionStore };