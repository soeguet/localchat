import { type StoreApi, type UseBoundStore, create } from "zustand";
import type {
	Hash,
	ProfilePicture,
	ProfilePictureObject,
} from "../utils/customTypes";

type useProfilePictureStoreType = {
	profilePictureMap: Map<string, ProfilePictureObject>;
	setProfilePictureMap: (
		profilePictureMap: Map<string, ProfilePictureObject>,
	) => void;
	fetchProfilePicture: (clientDbId: string) => ProfilePicture;
	fetchProfilePictureHash: (clientDbId: string) => Hash;
};

const useProfilePictureStore: UseBoundStore<
	StoreApi<useProfilePictureStoreType>
> = create<useProfilePictureStoreType>((set) => ({
	profilePictureMap: new Map<string, ProfilePictureObject>(),
	setProfilePictureMap: (
		profilePictureMap: Map<string, ProfilePictureObject>,
	) => set({ profilePictureMap: profilePictureMap }),
	fetchProfilePicture: (clientDbId: string) => {
		const profilePicture = useProfilePictureStore
			.getState()
			.profilePictureMap.get(clientDbId);
		if (profilePicture) {
			return profilePicture.data;
		}
		return "";
	},
	fetchProfilePictureHash: (clientDbId: string) => {
		const profilePicture = useProfilePictureStore
			.getState()
			.profilePictureMap.get(clientDbId);
		if (profilePicture) {
			return profilePicture.imageHash;
		}
		return "";
	},
}));

export { useProfilePictureStore };
