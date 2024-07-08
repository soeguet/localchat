import { useRef, useState } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { PreferPictureUrlCheckbox } from "./PreferPictureUrlCheckbox";
import { SettingsProfilePicturePreviewer } from "./SettingsProfilePicturePreviewer";
import { PicturePreviewHandler } from "./PicturePreviewHandler";

function NewProfilePicturePicker() {
	const [preferPictureUrl, setPreferPictureUrl] = useState(false);
	const urlInputRef = useRef<HTMLInputElement>(null);
	const setLocalProfilePicture = useSettingsStore(
		(state) => state.setLocalProfilePicture,
	);

	function togglePictureUrlSelector(checked: boolean) {
		useSettingsStore.getState().setLocalProfilePictureUrl("");
		useSettingsStore.getState().setLocalProfilePicture("");

		if (urlInputRef.current) {
			urlInputRef.current.value = "";
		}

		setPreferPictureUrl(checked);
	}

	return (
		<>
			<div
				data-testid="profile-picture-picker-container"
				className="col-span-3 grid grid-cols-8"
			>
				<SettingsProfilePicturePreviewer />
				<div className="col-span-6">
					<PreferPictureUrlCheckbox isSelected={togglePictureUrlSelector} />
					<PicturePreviewHandler
						preferPictureUrl={preferPictureUrl}
						urlInputRef={urlInputRef}
						setLocalProfilePicture={setLocalProfilePicture}
					/>
				</div>
			</div>
		</>
	);
}

export { NewProfilePicturePicker };
