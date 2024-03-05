import i18n from "../config/i18n";
import useSelectedLanguageStore from "../stores/selectedLanguageStore";

export function switchLanguage() {
    const language_selected = localStorage.getItem("language");
    if (language_selected === "en") {
        i18n.changeLanguage("de");
        localStorage.setItem("language", "de");
        useSelectedLanguageStore.getState().setSelectedLanguage("de");
    } else {
        i18n.changeLanguage("en");
        localStorage.setItem("language", "en");
        useSelectedLanguageStore.getState().setSelectedLanguage("en");
    }
}
