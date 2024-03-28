import { create } from "zustand";

type SelectedLanguageStore = {
    selectedLanguage: "en" | "de";
    switchLanguage: (language: string) => void;
    setSelectedLanguage: (language: "de" | "en") => void;
};

const useSelectedLanguageStore = create<SelectedLanguageStore>((set) => ({
    selectedLanguage: localStorage.getItem("language") === "de" ? "de" : "en",
    switchLanguage: (language: string) =>
        set({ selectedLanguage: language === "en" ? "de" : "en" }),
    setSelectedLanguage: (language: "de" | "en") =>
        set({ selectedLanguage: language }),
}));

const setSelectedLanguage = (language: "de" | "en") => {
    useSelectedLanguageStore.getState().setSelectedLanguage(language);
};

export { useSelectedLanguageStore, setSelectedLanguage };
