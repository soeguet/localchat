import {create, type StoreApi, type UseBoundStore} from "zustand";
import {useUserStore} from "./userStore";

type SettingsStoreType = {
    resetAllStoreValues: () => void;

    language: "de" | "en" | null;
    setLanguage: (language: "de" | "en" | null) => void;

    fontSize: number | null;
    setFontSize: (size: number | null) => void;

    localColor: string | null;
    setLocalColor: (color: string | null) => void;

    localName: string | null;
    setLocalName: (name: string | null) => void;

    localIp: string | null;
    setLocalIp: (ip: string | null) => void;

    localPort: string | null;
    setLocalPort: (port: string | null) => void;

    localProfilePicture: string | null;
    setLocalProfilePicture: (picture: string | null) => void;

    localProfilePictureUrl: string | null;
    setLocalProfilePictureUrl: (url: string | null) => void;

    localAvailability: boolean | null;
    setLocalAvailability: (availability: boolean | null) => void;
};

const useSettingsStore: UseBoundStore<StoreApi<SettingsStoreType>> =
    create<SettingsStoreType>((set) => ({
        resetAllStoreValues: () => {
            set({
                language: null,
                fontSize: null,
                localColor: null,
                localName: null,
                localIp: null,
                localPort: null,
                localProfilePicture: null,
                localProfilePictureUrl: null,
            });
        },

        language: (localStorage.getItem("language") as "de" | "en") || "en",
        setLanguage: (language: "en" | "de" | null) => {
            set({language});
        },

        fontSize: localStorage.getItem("fontSize")
            ? Number(localStorage.getItem("fontSize"))
            : 16,
        setFontSize: (size) => set({fontSize: size}),

        localColor: "",
        setLocalColor: (color: string | null) => set({localColor: color}),

        localName: "",
        setLocalName: (name: string | null) => set({localName: name}),

        localIp: "",
        setLocalIp: (ip: string | null) => set({localIp: ip}),

        localPort: "",
        setLocalPort: (port: string | null) => set({localPort: port}),

        localProfilePicture: "",
        setLocalProfilePicture: (picture: string | null) =>
            set({localProfilePicture: picture}),

        localProfilePictureUrl: "",
        setLocalProfilePictureUrl: (url: string | null) =>
            set({localProfilePictureUrl: url}),

        localAvailability: useUserStore.getState().availability,
        setLocalAvailability: (availability: boolean | null) =>
            set({localAvailability: availability}),
    }));

export default useSettingsStore;
