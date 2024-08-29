import {useState} from "react";
import {handleLocalSettingsUpdates} from "../../../../../../utils/settings/handleLocalSettingsUpdates";
import {handleProfileSettingsUpdatesWithSocketV2} from "../../../../../../utils/socket/handleCommunicationWithSocket";
import useSettingsStore from "../../../../../../stores/settingsStore";
import {NewSettingsModal} from "./body/NewSettingsModal";
import {NewSettingsModalButton} from "./button/NewSettingsModalButton";

function Settings() {
    const [isOpened, setIsOpened] = useState(false);

    async function handleProfileSettingsUpdateSaveButtonClick() {
        const reconnectionTimeoutValue = await handleLocalSettingsUpdates();

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
                    onSave={async () => {
                        console.log("save")
                        await handleProfileSettingsUpdateSaveButtonClick()
                    }}
                />
            )}
        </>
    );
}

export { Settings };