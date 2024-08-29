import {useSelectedLanguageStore} from "../../stores/selectedLanguageStore";

export function loadAppLanguageLocalStorage() {
    const selectedLanguage = localStorage.getItem("language");

    if (selectedLanguage) {
        useSelectedLanguageStore
            .getState()
            .setSelectedLanguage(selectedLanguage as "de" | "en");
    }
}