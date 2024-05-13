import { create, StoreApi, UseBoundStore } from "zustand";

type SettingsStoreType = {
    language: string;
    setLanguage: (language: string) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
    localColor: string;
    setLocalColor: (color: string) => void;
    localName: string;
    setLocalName: (name: string) => void;
    localIp: string;
    setLocalIp: (ip: string) => void;
    localPort: string;
    setLocalPort: (port: string) => void;
    localProfilePicture: string;
    setLocalProfilePicture: (picture: string) => void;
    localProfilePictureUrl: string;
    setLocalProfilePictureUrl: (url: string) => void;
};

const useSettingsStore: UseBoundStore<StoreApi<SettingsStoreType>> =
    create<SettingsStoreType>((set) => ({
        language: localStorage.getItem("language") || "en",
        setLanguage: (language: string) => {
            set({ language });
        },
        fontSize: localStorage.getItem("fontSize")
            ? Number(localStorage.getItem("fontSize"))
            : 16,
        setFontSize: (size) => set({ fontSize: size }),
        localColor: "",
        setLocalColor: (color: string) => set({ localColor: color }),
        localName: "",
        setLocalName: (name: string) => set({ localName: name }),
        localIp: "",
        setLocalIp: (ip: string) => set({ localIp: ip }),
        localPort: "",
        setLocalPort: (port: string) => set({ localPort: port }),
        localProfilePicture: "",
        setLocalProfilePicture: (picture: string) =>
            set({ localProfilePicture: picture }),
        localProfilePictureUrl: "",
        setLocalProfilePictureUrl: (url: string) => set({ localProfilePictureUrl: url }),
    }));

export default useSettingsStore;