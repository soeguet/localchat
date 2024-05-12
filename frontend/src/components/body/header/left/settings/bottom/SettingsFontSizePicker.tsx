import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";

function SettingsFontSizePicker() {
    const { t } = useTranslation();
    const fontSize = useSettingsStore((state) => state.fontSize);
    const setFontSize = useSettingsStore((state) => state.setFontSize);

    return (
        <>
            <div data-testid="settings-font-size-picker" className="grid">
                <label htmlFor="fontSize">
                    {t("profile_menu_font_size_label")}
                </label>
                <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                />
            </div>
        </>
    );
}

export { SettingsFontSizePicker };