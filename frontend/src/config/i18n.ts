import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const language = localStorage.getItem("language") || "en";

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/src/locales/{{lng}}/{{ns}}.json",
        },
        fallbackLng: language,
        debug: false,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
