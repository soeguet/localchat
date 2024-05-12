import { ChangeEvent, useState } from "react";
import useSettingsStore from "../../../../../stores/settingsStore";
import { SettingsProfilePicturePreviewer } from "./picture/SettingsProfilePicturePreviewer";
import { PreferPictureUrlCheckbox } from "./picture/PreferPictureUrlCheckbox";

function NewProfilePicturePicker() {
    const [preferPictureUrl, setPreferPictureUrl] = useState(false);
    const setLocalProfilePicture = useSettingsStore(
        (state) => state.setProfilePicture
    );

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        if (!file) {
            return;
        }

        try {
            const arrayBuffer = await readFileAsArrayBuffer(file);
            // convert ArrayBuffer to base64 string
            const base64String = arrayBufferToBase64(arrayBuffer);
            const pictureUrl = `data:image/jpeg;base64,${base64String}`;
            setLocalProfilePicture(pictureUrl);
        } catch (error) {
            console.error("Error reading the file.", error);
        }
    }

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