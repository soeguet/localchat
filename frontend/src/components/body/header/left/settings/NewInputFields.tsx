import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../stores/settingsStore";

function NewInputFields() {
    const { t } = useTranslation();
    const localName = useSettingsStore((state) => state.localName);
    const setLocalName = useSettingsStore((state) => state.setLocalName);
    const localIp = useSettingsStore((state) => state.localIp);
    const setLocalIp = useSettingsStore((state) => state.setLocalIp);
    const localPort = useSettingsStore((state) => state.localPort);
    const setLocalPort = useSettingsStore((state) => state.setLocalPort);

    return (
        <>
            <div
                data-testid="settings-input-field-container"
                className="flex justify-between gap-3"
            >
                <div className="flex flex-col">
                    <label htmlFor="name">{t("profile_menu_item_name")}</label>
                    <input
                        type="text"
                        id="name"
                        value={localName}
                        onChange={(e) => setLocalName(e.target.value)}
                        className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="socketIp">Socket IP</label>
                    <input
                        type="text"
                        id="socketIp"
                        value={localIp}
                        onChange={(e) => setLocalIp(e.target.value)}
                        className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="socketPort">Socket Port</label>
                    <input
                        type="text"
                        id="socketPort"
                        value={localPort}
                        onChange={(e) => setLocalPort(e.target.value)}
                        className="mt-1 rounded-md border border-gray-300 p-2"
                    />
                </div>
            </div>
        </>
    );
}

export { NewInputFields };