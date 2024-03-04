import i18n from "../config/i18n";

export function switchLanguage() {
    const language_selected = localStorage.getItem("language");
    if (language_selected === "en") {
        i18n.changeLanguage("de");
        localStorage.setItem("language", "de");
    } else {
        i18n.changeLanguage("en");
        localStorage.setItem("language", "en");
    }
}
