import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import useUserStore from "../stores/userStore";
import useEnvironmentStore from "../stores/environmentStore";

type ProfileModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileModal(props: ProfileModalProps) {
    const [profilePicture, setProfilePicture] = useState<ArrayBuffer>(new ArrayBuffer(0));
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [name, setName] = useState(useUserStore.getState().myUsername);
    const [socketIp, setSocketIp] = useState(useEnvironmentStore.getState().socketIp);
    const [socketPort, setSocketPort] = useState<string>(useEnvironmentStore.getState().socketPort);
    const [profileColor, setProfileColor] = useState("");
    const [preferPictureUrl, setPreferPictureUrl] = useState(false);

    if (!props.isOpen) return null;

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        if (!file) {
            console.log("No file selected.");
            return;
        }

        try {
            const arrayBuffer = await readFileAsArrayBuffer(file);
            console.log(arrayBuffer);
            setProfilePicture(arrayBuffer);
        } catch (error) {
            console.error("Error reading the file.", error);
        }
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
    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        useEnvironmentStore.getState().setSocketIp(socketIp);
        useEnvironmentStore.getState().setSocketPort(socketPort);
        useUserStore.getState().setMyUsername(name);

        useUserStore.getState().setMyColor(profileColor);

        if (!preferPictureUrl && profilePicture) {
            const base64String = arrayBufferToBase64(profilePicture);
            const dataUrl = `data:image/jpeg;base64,${base64String}`; // Ändern Sie den MIME-Typ entsprechend.
            useUserStore.getState().setMyProfilePhoto(dataUrl);
        } else if (preferPictureUrl) {
            useUserStore.getState().setMyProfilePhoto(profilePictureUrl);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg text-black w-full sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 grid grid-cols-8">
                            <div className="col-span-1 my-auto ml-1.5">
                                <ProfilePicture />
                            </div>
                            <div className="col-span-7">
                                <label htmlFor="profilePicture">
                                    Profile Picture
                                    <div>
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                aria-describedby="comments-description"
                                                onChange={(e) => setPreferPictureUrl(e.target.checked)}
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="comments" className="font-medium ml-3 text-gray-500">
                                                Prefer Picture URL
                                            </label>
                                        </div>
                                    </div>
                                </label>
                                {preferPictureUrl ? (
                                    <input
                                        type="text"
                                        id="profilePicture"
                                        onChange={(e) => setProfilePictureUrl(e.target.value)}
                                        className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                    />
                                ) : (
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFileChange}
                                        className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketIp">Socket IP</label>
                            <input
                                type="text"
                                id="socketIp"
                                value={socketIp}
                                onChange={(e) => setSocketIp(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketPort">Socket Port</label>
                            <input
                                type="text"
                                id="socketPort"
                                value={socketPort}
                                onChange={(e) => setSocketPort(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="profileColor">Profile Color</label>
                            <input
                                type="color"
                                id="profileColor"
                                value={profileColor}
                                onChange={(e) => setProfileColor(e.target.value)}
                                className="mt-1 ml-2 border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-2 flex justify-end items-center">
                            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Save Changes
                            </button>
                            <button
                                onClick={() => props.setIsOpen(false)}
                                type="button"
                                className="ml-2 mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProfileModal;
