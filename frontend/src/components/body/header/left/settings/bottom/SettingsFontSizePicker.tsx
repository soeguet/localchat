import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useFontSizeStore } from "../../../../../../stores/fontSizeStore";
import { useEffect } from "react";

function SettingsFontSizePicker() {
    const { t } = useTranslation();
    const fontSize = useSettingsStore((state) => state.fontSize);
    const setFontSize = useSettingsStore((state) => state.setFontSize);

    const selectedFontSize = useFontSizeStore((state) => state.fontSize);

    useEffect(() => {
        setFontSize(selectedFontSize);
    }, [selectedFontSize]);

    return (
        <>
            <div data-testid="settings-font-size-picker" className="grid">
                <label style={{fontSize: `${fontSize}px`}} htmlFor="fontSize">
                    {t("profile_menu_font_size_label")} - {fontSize}
                </label>
                <input
                    type="range"
                    min="12"
                    max="30"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                />
            </div>
        </>
    );
}

export { SettingsFontSizePicker };
