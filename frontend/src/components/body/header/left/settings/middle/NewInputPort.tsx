import { useEffect } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";

function NewInputPort() {
    const localPort = useSettingsStore((state) => state.localPort);
    const setLocalPort = useSettingsStore((state) => state.setLocalPort);

    useEffect(() => {
        const localPort = useUserStore.getState().socketPort;
        setLocalPort(localPort);
    }, [setLocalPort]);

    return (
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
    );
}

export { NewInputPort };
