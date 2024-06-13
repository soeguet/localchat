import { useState } from "react";
import { NewSettingsModal } from "../NewSettingsModal";
import useSettingsStore from "../../../../../../../stores/settingsStore";
import { handleProfileSettingsUpdatesWithSocket } from "../../../../../../../utils/handleCommunicationWithSocket";
import { handleLocalSettingsUpdates } from "../../../../../../../utils/handleLocalSettingsUpdates";
import { useTranslation } from "react-i18next";

function NewSettingsModalButton() {
	const { t } = useTranslation();
	const [isOpened, setIsOpened] = useState(false);

	function handleProfileSettingsUpdateSaveButtonClick() {
		const reconnectionTimeoutValue = handleLocalSettingsUpdates();

		const timeout: NodeJS.Timeout = setTimeout(() => {
			handleProfileSettingsUpdatesWithSocket();

			setIsOpened(false);
			useSettingsStore.getState().resetAllStoreValues();

			return clearTimeout(timeout);
		}, reconnectionTimeoutValue);
	}

	return (
		<>
			<button
				type="button"
				data-testid="settings-menu-button"
				className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
				onClick={() => {
					setIsOpened(true);
				}}>
				{t("menu_item_profile")}
			</button>

			{isOpened && (
				<NewSettingsModal
					isOpen={isOpened}
					onClose={() => {
						setIsOpened(false);
						useSettingsStore.getState().resetAllStoreValues();
					}}
					onSave={handleProfileSettingsUpdateSaveButtonClick}
				/>
			)}
		</>
	);
}

export { NewSettingsModalButton };
