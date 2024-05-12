import { useState } from "react";
import useSettingsStore from "../../../../../stores/settingsStore";
import { SettingsProfilePicturePreviewer } from "./picture/SettingsProfilePicturePreviewer";
import { PreferPictureUrlCheckbox } from "./picture/PreferPictureUrlCheckbox";
import { handleFileChange } from "../../../../../utils/pictureHelper";

function NewProfilePicturePicker() {
    const [preferPictureUrl, setPreferPictureUrl] = useState(false);
    const setLocalProfilePicture = useSettingsStore(
        (state) => state.setProfilePicture
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
                        isSelected={setPreferPictureUrl}
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