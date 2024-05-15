import { NewProfilePicturePicker } from "../top/NewProfilePicturePicker";
import { NewSettingsButtonArea } from "./button/NewSettingsButtonArea";
import { SettingsColorPicker } from "../bottom/SettingsColorPicker";
import { SettingsFontSizePicker } from "../bottom/SettingsFontSizePicker";
import { SettingsLanguagePicker } from "../bottom/SettingsLanguagePicker";
import { NewInputIp } from "../middle/NewInputIp";
import { NewInputPort } from "../middle/NewInputPort";
import { NewInputUsername } from "../middle/NewInputUsername";

type NewSettingsModalProps = {
    onClose: () => void;
};

function NewSettingsModalContainer(props: NewSettingsModalProps) {
    return (
        <>
            <div
                className="flex flex-col rounded-xl border-2 border-black bg-white p-3 transition duration-300 ease-in-out hover:border-cyan-400"
                data-testid="settings-modal-container"
            >
                <div className="flex grow flex-col justify-start gap-5 border p-5">
                    <NewProfilePicturePicker />
                    {/* <NewInputFields /> remove this*/}
                    <div
                        data-testid="settings-input-field-container"
                        className="flex justify-between gap-3"
                    >
                        <NewInputUsername />
                        <NewInputIp />
                        <NewInputPort />
                    </div>
                    {/* <NewPickerFields />  remove this */}
                    <div className="flex justify-start gap-5">
                        <SettingsLanguagePicker />
                        <SettingsColorPicker />
                        <SettingsFontSizePicker />
                    </div>
                </div>
                <NewSettingsButtonArea onClose={props.onClose} />
            </div>
        </>
    );
}

export { NewSettingsModalContainer };
