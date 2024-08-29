import { i18n } from "../../config/i18n";
import {
	setSelectedLanguage,
	useSelectedLanguageStore,
} from "../../stores/selectedLanguageStore";

export async function switchLanguage() {
	const language_selected =
		useSelectedLanguageStore.getState().selectedLanguage;
	if (language_selected === "en") {
		await i18n.changeLanguage("de");
		localStorage.setItem("language", "de");
		setSelectedLanguage("de");
	} else {
		await i18n.changeLanguage("en");
		localStorage.setItem("language", "en");
		setSelectedLanguage("en");
	}
}