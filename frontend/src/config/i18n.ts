import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en_translation } from "../utils/translation/en";
import { de_translation } from "../utils/translation/de";

const language = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
	lng: language,
	fallbackLng: "en",
	// have a common namespace used around the full app
	ns: ["translationsNS"],
	defaultNS: "translationsNS",

	debug: false,

	interpolation: {
		escapeValue: false, // not needed for react!!
	},

	resources: {
		en: { translationsNS: en_translation },
		de: { translationsNS: de_translation },
	},
});

export { i18n };
