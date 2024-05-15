import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";

function NewInputUsername() {
    const { t } = useTranslation();

    const localName = useSettingsStore((state) => state.localName);
    const setLocalName = useSettingsStore((state) => state.setLocalName);
    return (
        <div data-testid="settings-input-username" className="flex flex-col">
            <label htmlFor="name">{t("profile_menu_item_name")}</label>
            <input
                type="text"
                id="name"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="mt-1 rounded-md border border-gray-300 p-2"
            />
        </div>
    );
}

export {NewInputUsername};
