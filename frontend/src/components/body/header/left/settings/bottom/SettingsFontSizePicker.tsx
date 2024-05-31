import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useFontSizeStore } from "../../../../../../stores/fontSizeStore";
import { useEffect } from "react";

function SettingsFontSizePicker() {
    const { t } = useTranslation();
    const localFontSize = useSettingsStore((state) => state.fontSize);
    const setLocalFontSize = useSettingsStore((state) => state.setFontSize);

    const globalFontSize = useFontSizeStore((state) => state.fontSize);

    useEffect(() => {
        setLocalFontSize(globalFontSize);
    }, [globalFontSize]);

    return (
        <>
            <div data-testid="settings-font-size-picker" className="grid">
                <label
                    style={{ fontSize: `${localFontSize}px` }}
                    htmlFor="fontSize"
                >
                    {t("profile_menu_font_size_label")} - {localFontSize}
                </label>
                <input
                    type="range"
                    min="12"
                    max="30"
                    value={localFontSize}
                    onChange={(e) => setLocalFontSize(Number(e.target.value))}
                />
            </div>
        </>
    );
}

export { SettingsFontSizePicker };
