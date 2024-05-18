import { useState } from "react";
import { NewSettingsModal } from "../NewSettingsModal";
import useSettingsStore from "../../../../../../../stores/settingsStore";
import { handleProfileSettingsUpdatesWithSocket } from "../../../../../../../utils/handleCommunicationWithSocket";
import { handleLocalSettingsUpdates } from "../../../../../../../utils/handleLocalSettingsUpdates";

function NewSettingsModalButton() {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <button
                data-testid="settings-menu-button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => setIsOpened(true)}
            >
                [WIP] Settings
            </button>

            {isOpened && (
                <NewSettingsModal
                    isOpen={isOpened}
                    onClose={() => {
                        setIsOpened(false);
                        useSettingsStore.getState().resetAllStoreValues();
                    }}
                    onSave={() => {
                        const reconnectionTimeoutValue =
                            handleLocalSettingsUpdates();

                        const timeout: NodeJS.Timeout = setTimeout(() => {
                            handleProfileSettingsUpdatesWithSocket();

                            setIsOpened(false);
                            useSettingsStore.getState().resetAllStoreValues();

                            return clearTimeout(timeout);
                        }, reconnectionTimeoutValue);
                    }}
                />
            )}
        </>
    );
}

export { NewSettingsModalButton };
