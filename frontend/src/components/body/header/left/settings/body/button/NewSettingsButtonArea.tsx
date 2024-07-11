import { useTranslation } from "react-i18next";
import useSettingsStore from "../../../../../../../stores/settingsStore";

type NewSettingsButtonAreaProps = { onClose: () => void; onSave: () => void };

function NewSettingsButtonArea(props: NewSettingsButtonAreaProps) {
	const { t } = useTranslation();
	let localColor = useSettingsStore((state) => state.localColor);

	if (
		localColor === null ||
		localColor === undefined ||
		localColor === "white" ||
		localColor.includes("#f") ||
		localColor.includes("#d")
	) {
		localColor = "#3584e4";
	}

	return (
		<>
			<div
				data-testid="settings-button-area"
				className="col-span-2 flex items-center justify-end"
			>
				<button
					data-testid="save-settings-modal-button"
					onClick={props.onSave}
					className="mt-2 rounded-lg  px-4 py-2 text-white"
					style={{ backgroundColor: localColor }}
				>
					{t("settings_save_button")}
				</button>
				<button
					data-testid="close-settings-modal-button"
					onClick={props.onClose}
					className="ml-2 mt-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
				>
					{t("settings_cancel_button")}
				</button>
			</div>
		</>
	);
}

export { NewSettingsButtonArea };
