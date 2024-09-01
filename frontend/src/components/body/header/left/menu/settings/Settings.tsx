import { useState } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { handleAvailabilityUpdates, handleFontSizeUpdates, handleLanguageUpdates, handleWebsocketDataUpdates, handleUsernameUpdates } from "../../../../../../utils/settings/handleLocalSettingsUpdates";
import { handleProfileSettingsUpdatesWithSocketV2 } from "../../../../../../utils/socket/handleCommunicationWithSocket";
import { NewSettingsModal } from "./body/NewSettingsModal";
import { NewSettingsModalButton } from "./button/NewSettingsModalButton";

function Settings() {
    const [isOpened, setIsOpened] = useState(false);

    async function handleProfileSettingsUpdateSaveButtonClick() {
        handleFontSizeUpdates();
        handleAvailabilityUpdates();
        handleUsernameUpdates();
        //await handleLanguageUpdates()

        const reconnectionTimeoutValue = await handleWebsocketDataUpdates();

        const timeout: NodeJS.Timeout = setTimeout(async () => {
            await handleProfileSettingsUpdatesWithSocketV2();

            setIsOpened(false);
			useSettingsStore.getState().resetAllStoreValues();

            return clearTimeout(timeout);

        }, reconnectionTimeoutValue);
    }

    return (
        <>
            <NewSettingsModalButton menuIsOpened={setIsOpened} />
            {isOpened && (
                <NewSettingsModal
                    isOpen={isOpened}
                    onClose={() => {
                        setIsOpened(false);
                        useSettingsStore.getState().resetAllStoreValues();
                    }}
                    handleProfileSettingsUpdateSaveButtonClick={async () => {
                        await handleProfileSettingsUpdateSaveButtonClick()
                    }}
                />
            )}
        </>
    );
}

export { Settings };
