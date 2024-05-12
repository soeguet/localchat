import { NewInputFields } from "../middle/NewInputFields";
import { NewPickerFields } from "../bottom/NewPickerFields";
import { NewProfilePicturePicker } from "../top/NewProfilePicturePicker";
import { NewSettingsButtonArea } from "./button/NewSettingsButtonArea";

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
                <div className="flex grow flex-col justify-start gap-5 border bg-red-50 p-5">
                    <NewProfilePicturePicker />
                    <NewInputFields />
                    <NewPickerFields />
                </div>
                <NewSettingsButtonArea onClose={props.onClose} />
            </div>
        </>
    );
}

export { NewSettingsModalContainer };