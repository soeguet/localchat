import { useState } from "react";
import { NewSettingsModal } from "../NewSettingsModal";
import useSettingsStore from "../../../../../../../stores/settingsStore";
import { handleProfileSettingsUpdatesWithSocket } from "../../../../../../../utils/handleCommunicationWithSocket";
import { handleLocalSettingsUpdates } from "../../../../../../../utils/handleLocalSettingsUpdates";
import { useTranslation } from "react-i18next";
import { SettingsIconSvg } from "../../../../../../svgs/icons/SettingsIconSvg";

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
				className="group flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
				onClick={() => {
					setIsOpened(true);
				}}>
				<div className="group-hover:animate-bounce">
					<SettingsIconSvg />
				</div>
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
