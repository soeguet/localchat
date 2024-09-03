import { create } from "zustand";
import { errorLogger } from "../logger/errorLogger";
import type { VersionEntity } from "../utils/types/customTypes";

type VersionStoreProps = {
	major: number;
	minor: number;
	patch: number;
	needsUpdate: boolean;
	setVersion: (version: string) => void;
	checkForUpdate: (newVersion: VersionEntity) => void;
};

const useVersionStore = create<VersionStoreProps>((set, _) => ({
	major: 0,
	minor: 0,
	patch: 0,
	needsUpdate: false,

	setVersion: (version: string) =>
		set(() => {
			const [major, minor, patch] = version.split(".").map(Number);

			if (
				Number.isNaN(major) ||
				Number.isNaN(minor) ||
				Number.isNaN(patch) ||
				major === undefined ||
				minor === undefined ||
				patch === undefined ||
				(major === 0 && minor === 0 && patch === 0)
			) {
				console.error("Version is not valid");

				errorLogger.logError(new Error("Version is not valid"));
			}

			return { major, minor, patch };
		}),

	checkForUpdate: (newVersion: VersionEntity) =>
		set((state) => {
			const needsUpdate =
				newVersion.major > state.major ||
				(newVersion.major === state.major &&
					newVersion.minor > state.minor) ||
				(newVersion.major === state.major &&
					newVersion.minor === state.minor &&
					newVersion.patch > state.patch);

			if (needsUpdate) {
				return {
					major: newVersion.major,
					minor: newVersion.minor,
					patch: newVersion.patch,
					needsUpdate,
				};
			}

			return state;
		}),
}));

export { useVersionStore };