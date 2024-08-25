import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useEffect } from "react";
import { useUserStore } from "../../../../../../stores/userStore";

function NewInputUsername() {
	const { t } = useTranslation();

	const localName = useSettingsStore((state) => state.localName) ?? useUserStore.getState().myUsername;
	const setLocalName = useSettingsStore((state) => state.setLocalName);

	useEffect(() => {
		setLocalName(useUserStore.getState().myUsername);
	}, []);

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

export { NewInputUsername };