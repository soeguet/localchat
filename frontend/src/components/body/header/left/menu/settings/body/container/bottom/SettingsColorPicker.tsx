import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../../../../../../../stores/clientStore";
import useSettingsStore from "../../../../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../../../../stores/userStore";

function SettingsColorPicker() {
	const { t } = useTranslation();

	const localColor =
		useSettingsStore((state) => state.localColor) ??
		useUserStore.getState().myColor;
	const setLocalColor = useSettingsStore((state) => state.setLocalColor);

	const myId = useUserStore((state) => state.myId);
	const myProfileColor = useClientStore(
		(state) => state.getClientById(myId)?.clientColor,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: changing this useEffect will break the color functionality
	useEffect(() => {
		setLocalColor(myProfileColor || localColor);
	}, [myProfileColor]);

	return (
		<>
			<div
				data-testid="settings-profile-color-picker-container"
				className="flex flex-col">
				<label htmlFor="profileColor">
					{t("profile_menu_profile_color_label")}
				</label>
				<input
					type="color"
					id="profileColor"
					data-testid="settings-profile-color-picker"
					onChange={(e) => {
						setLocalColor(e.target.value);
					}}
					className="ml-2 mt-1 w-32 rounded-md border border-gray-300 p-5"
					style={{
						backgroundColor: localColor,
						color: localColor,
					}}
				/>
			</div>
		</>
	);
}

export { SettingsColorPicker };
