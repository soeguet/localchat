import {create, type StoreApi, type UseBoundStore} from "zustand";
import type {ClientId, Hash, ProfilePicture, ProfilePictureObject,} from "../utils/types/customTypes";

type useProfilePictureStoreType = {
    thisClientProfilePictureObject: ProfilePictureObject | null;
    setThisClientProfilePictureHashObject: (profilePictureObject: ProfilePictureObject | null) => void;
    getThisClientProfilePictureHash: () => Hash;

    noProfilePictureAvailableMap: Map<ClientId, false>;
    removeFromNoProfilePictureAvailableMap: (clientDbId: ClientId) => void;
    addToNoProfilePictureAvailableMap: (clientDbId: ClientId) => void;

    profilePictureMap: Map<ClientId, ProfilePictureObject>;
    setProfilePictureMap: (
        profilePictureMap: Map<ClientId, ProfilePictureObject>,
    ) => void;
    addToProfilePictureMap: (
        clientDbId: ClientId,
        profilePictureObject: ProfilePictureObject,
    ) => void;

    fetchProfilePicture: (clientDbId: ClientId) => ProfilePicture;
    fetchProfilePictureHash: (clientDbId: ClientId) => Hash;
};

const useProfilePictureStore: UseBoundStore<StoreApi<useProfilePictureStoreType>> = create<useProfilePictureStoreType>((set) => ({

    thisClientProfilePictureObject: null,
    setThisClientProfilePictureHashObject: (profilePictureObject: ProfilePictureObject | null) => set({thisClientProfilePictureObject: profilePictureObject}),
    getThisClientProfilePictureHash: () => useProfilePictureStore.getState().thisClientProfilePictureObject?.imageHash || "",

    noProfilePictureAvailableMap: new Map<ClientId, false>(),

    addToNoProfilePictureAvailableMap: (clientDbId: ClientId) => {
        set((state) => {
            const newMap = new Map(state.noProfilePictureAvailableMap);
            newMap.set(clientDbId, false);
            return {noProfilePictureAvailableMap: newMap};
        });
    },

    removeFromNoProfilePictureAvailableMap: (clientDbId: ClientId) => {
        set((state) => {
            const newMap = new Map(state.noProfilePictureAvailableMap);
            newMap.delete(clientDbId);
            return {noProfilePictureAvailableMap: newMap};
        });
    },

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
        set({profilePictureMap: profilePictureMap});
    },

    addToProfilePictureMap: (
        clientDbId: ClientId,
        profilePictureObject: ProfilePictureObject,
    ) => {
        set((state) => {
            const newMap = new Map(state.profilePictureMap);
            newMap.set(clientDbId, profilePictureObject);
            return {profilePictureMap: newMap};
        });
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

export {useProfilePictureStore};
