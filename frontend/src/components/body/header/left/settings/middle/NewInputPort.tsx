import { useEffect } from "react";
import useEnvVars from "../../../../../../hooks/useEnvVars";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { EnvVars } from "../../../../../../utils/customTypes";

function NewInputPort() {
    const localPort = useSettingsStore((state) => state.localPort);
    const setLocalPort = useSettingsStore((state) => state.setLocalPort);
    const [envVars] = useEnvVars();
    const port = (envVars as EnvVars).port;

    useEffect(() => {
        setLocalPort(port);
    }, [port]);

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
