import useSelectedLanguageStore from "../stores/selectedLanguageStore";

export function initializeSelectedAppLanguageFromLocalStorage() {

    const selectedLanguage = localStorage.getItem("selectedLanguage");

    if (selectedLanguage) {
        useSelectedLanguageStore.getState().setSelectedLanguage(selectedLanguage as "de" | "en");
    }
}