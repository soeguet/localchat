import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";

function SettingsLanguagePicker() {
    const { t } = useTranslation();

    const language = useSettingsStore((state) => state.language);
    const setLanguage = useSettingsStore((state) => state.setLanguage);

    return (
        <>
            <div data-testid="settings-language-picker-container">
                <label htmlFor="languageSelection">
                    {t("language_selection")}
                </label>
                <select
                    id="languageSelectimn"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                >
                    <option value="de">
                        {t("profile_menu_item_language_de")}
                    </option>
                    <option value="en">
                        {t("profile_menu_item_language_en")}
                    </option>
                </select>
            </div>
        </>
    );
}

export { SettingsLanguagePicker };
