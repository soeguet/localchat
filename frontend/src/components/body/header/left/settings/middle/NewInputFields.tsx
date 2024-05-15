import useSettingsStore from "../../../../../../stores/settingsStore";
import { NewInputUsername } from "./NewInputUsername";

function NewInputFields() {

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
                <NewInputUsername />
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
