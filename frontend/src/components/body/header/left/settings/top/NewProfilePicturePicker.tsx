import { useState } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { PreferPictureUrlCheckbox } from "./PreferPictureUrlCheckbox";
import { handleFileChange } from "../../../../../../utils/pictureHelper";
import { SettingsProfilePicturePreviewer } from "./SettingsProfilePicturePreviewer";

function NewProfilePicturePicker() {
    const [preferPictureUrl, setPreferPictureUrl] = useState(false);

    function togglePictureUrlSelector(checked: boolean) {
        useSettingsStore.getState().setLocalProfilePictureUrl("");
        useSettingsStore.getState().setLocalProfilePicture("");
        setPreferPictureUrl(checked);
    }

    const setLocalProfilePicture = useSettingsStore(
        (state) => state.setLocalProfilePicture
    );

    return (
        <>
            <div
                data-testid="profile-picture-picker-container"
                className="col-span-3 grid grid-cols-8"
            >
                <SettingsProfilePicturePreviewer />
                <div className="col-span-6">
                    <PreferPictureUrlCheckbox
                        isSelected={togglePictureUrlSelector}
                    />
                    {preferPictureUrl ? (
                        <input
                            type="text"
                            placeholder="link here"
                            id="profilePicture"
                            onChange={(e) =>
                                setLocalProfilePicture(e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                        />
                    ) : (
                        //
                        // handleFileChange needs to be refactored
                        <input
                            type="file"
                            id="profilePicture"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleFileChange}
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export { NewProfilePicturePicker };
