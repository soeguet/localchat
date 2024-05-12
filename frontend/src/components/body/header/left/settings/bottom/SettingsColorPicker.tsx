import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";

function SettingsColorPicker() {
    const { t } = useTranslation();

    const localColor = useSettingsStore((state) => state.localColor);
    const setLocalColor = useSettingsStore((state) => state.setLocalColor);

    return (
        <>
            <div
                data-testid="settings-profile-color-picker"
                className="flex flex-col"
            >
                <label htmlFor="profileColor">
                    {t("profile_menu_profile_color_label")}
                </label>
                <input
                    type="color"
                    id="profileColor"
                    onChange={(e) => {
                        setLocalColor(e.target.value);
                    }}
                    className="ml-2 mt-1 w-32 rounded-md border border-gray-300 p-5"
                    style={{
                        backgroundColor: localColor,
                        color: localColor,
                    }}
                />
            </div>
        </>
    );
}

export { SettingsColorPicker };