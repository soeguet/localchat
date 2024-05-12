import { SettingsColorPicker } from "./SettingsColorPicker";
import { SettingsFontSizePicker } from "./SettingsFontSizePicker";
import { SettingsLanguagePicker } from "./SettingsLanguagePicker";

function NewPickerFields() {
    return (
        <>
            <div
                data-testid="settings-picker-field-container"
                className="flex justify-start gap-5"
            >
                <SettingsLanguagePicker />
                <SettingsColorPicker />
                <SettingsFontSizePicker />
            </div>
        </>
    );
}

export { NewPickerFields };