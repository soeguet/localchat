import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const language = localStorage.getItem("language") || "en";

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/locale/{{lng}}/{{ns}}.json",
        },
        fallbackLng: language,
        debug: true,

        interpolation: {
            escapeValue: false,
        },
    }).then(r => console.log("i18n initialized!", r));

export default i18n;