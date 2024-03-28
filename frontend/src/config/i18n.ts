import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const language = localStorage.getItem("language") || "en";

let isTestMode: boolean = false;
try {
    isTestMode =
        process.env.NODE_ENV === "test" ||
        process.env.REACT_APP_TEST_MODE === "true";
} catch (e) {
    console.log("Error in i18n.ts", e);
}

const loadPath = isTestMode
    ? "/public/locale/{{lng}}/{{ns}}.json"
    : "/locale/{{lng}}/{{ns}}.json";

//console.log("Current Working Directory:", process.cwd());

await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: loadPath,
        },
        fallbackLng: language,
        debug: true,

        interpolation: {
            escapeValue: false,
        },
    })
    .then((r) => console.log("i18n initialized!", r));

export default i18n;
