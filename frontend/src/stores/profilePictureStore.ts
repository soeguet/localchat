import { type StoreApi, type UseBoundStore, create } from "zustand";
import {
	PayloadSubType,
	type ClientId,
	type Hash,
	type ProfilePicture,
	type ProfilePictureObject,
} from "../utils/customTypes";

type useProfilePictureStoreType = {
	profilePictureMap: Map<ClientId, ProfilePictureObject>;
	setProfilePictureMap: (
		profilePictureMap: Map<ClientId, ProfilePictureObject>,
	) => void;
	fetchProfilePicture: (clientDbId: ClientId) => ProfilePicture;
	fetchProfilePictureHash: (clientDbId: ClientId) => Hash;
};

const useProfilePictureStore: UseBoundStore<
	StoreApi<useProfilePictureStoreType>
> = create<useProfilePictureStoreType>((set) => ({
	profilePictureMap: new Map<ClientId, ProfilePictureObject>(),

	setProfilePictureMap: (
		profilePictureMap: Map<ClientId, ProfilePictureObject>,
	) => {
		for (const [key, value] of profilePictureMap) {
			if (key === undefined) {
				throw new Error("key is undefined");
			}
			if (value === undefined) {
				throw new Error("value is undefined");
			}
		}
		set({ profilePictureMap: profilePictureMap });
	},

	fetchProfilePicture: (clientDbId: ClientId) => {
		const profilePicture = useProfilePictureStore
			.getState()
			.profilePictureMap.get(clientDbId);
		if (profilePicture) {
			return profilePicture.data;
		}
		return "";
	},

	fetchProfilePictureHash: (clientDbId: ClientId) => {
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
