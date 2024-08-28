import { NewProfilePicturePicker } from "../top/NewProfilePicturePicker";
import { NewSettingsButtonArea } from "./button/NewSettingsButtonArea";
import { SettingsColorPicker } from "../bottom/SettingsColorPicker";
import { SettingsFontSizePicker } from "../bottom/SettingsFontSizePicker";
import { SettingsLanguagePicker } from "../bottom/SettingsLanguagePicker";
import { NewInputIp } from "../middle/NewInputIp";
import { NewInputPort } from "../middle/NewInputPort";
import { NewInputUsername } from "../middle/NewInputUsername";
import { useState } from "react";
import useSettingsStore from "../../../../../../../stores/settingsStore";
import { AvailabilityCheckbox } from "../../extra/AvailabilityCheckbox";
import {useUserStore} from "../../../../../../../stores/userStore";

type NewSettingsModalProps = {
	onClose: () => void;
	onSave: () => void;
};

function NewSettingsModalContainer(props: NewSettingsModalProps) {
	const [hover, setHover] = useState(false);
	const profileColor = useSettingsStore((state) => state.localColor) ?? useUserStore.getState().myColor;
	return (
		<>
			<div
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className="flex flex-col rounded-xl border-2 border-transparent bg-white p-3 transition duration-300 ease-in-out "
				style={{
					borderColor: hover ? profileColor : "",
				}}
				data-testid="settings-modal-container"
			>
				<div className="flex grow flex-col justify-start gap-5 border p-5">
					<NewProfilePicturePicker />
					<div
						data-testid="settings-input-field-container"
						className="flex flex-wrap justify-start gap-3"
					>
						<NewInputUsername />
						<NewInputIp />
						<NewInputPort />
					</div>
					<div className="flex flex-wrap justify-start gap-5">
						<SettingsLanguagePicker />
						<SettingsColorPicker />
						<SettingsFontSizePicker />
					</div>
					<div>
						<AvailabilityCheckbox />
					</div>
				</div>
				<NewSettingsButtonArea onSave={props.onSave} onClose={props.onClose} />
			</div>
		</>
	);
}

export { NewSettingsModalContainer };