import { SettingsColorPicker } from "./field/SettingsColorPicker";
import { SettingsFontSizePicker } from "./field/SettingsFontSizePicker";
import { SettingsLanguagePicker } from "./field/SettingsLanguagePicker";

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