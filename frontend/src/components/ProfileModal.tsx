import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import useUserStore from "../stores/userStore";
import useEnvironmentStore from "../stores/environmentStore";
import useWebsocketStore from "../stores/websocketStore";
import { PayloadSubType, ProfileUpdatePayload } from "../utils/customTypes";
import useClientsStore from "../stores/clientsStore";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";

type ProfileModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileModal(props: ProfileModalProps) {
    const { t } = useTranslation();
    // just in case
    if (!props.isOpen) return null;

    const [preferPictureUrl, setPreferPictureUrl] = useState(false);
    const clientId = useUserStore((state) => state.myId);

    // name
    const name = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.username);
    const setName = useUserStore((state) => state.setMyUsername);
    const [localName, setLocalName] = useState(name);
    // socketIp
    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const setSocketIp = useEnvironmentStore((state) => state.setSocketIp);
    const [localIp, setLocalIp] = useState(socketIp);
    // socketPort
    const socketPort = useEnvironmentStore((state) => state.socketPort);
    const setSocketPort = useEnvironmentStore((state) => state.setSocketPort);
    const [localPort, setLocalPort] = useState(socketPort);
    // profileColor
    const profileColor = useUserStore((state) => state.myColor);
    const setProfileColor = useUserStore((state) => state.setMyColor);
    const [localColor, setLocalColor] = useState("");

    // profilePicture
    const setProfilePhotoUrl = useUserStore((state) => state.setMyProfilePhoto);
    const [localProfilePicture, setLocalProfilePicture] = useState("");
    // const [localProfilePictureBuffer, setLocalProfilePictureBuffer] = useState<ArrayBuffer | null>(null);
    // websocket
    const websocket = useWebsocketStore((state) => state.ws);
    //language
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        if (!file) {
            console.log("No file selected.");
            return;
        }

        try {
            const arrayBuffer = await readFileAsArrayBuffer(file);
            // set profile picture
            let pictureUrl = "";
            // convert ArrayBuffer to base64 string
            const base64String = arrayBufferToBase64(arrayBuffer);
            pictureUrl = `data:image/jpeg;base64,${base64String}`;
            setLocalProfilePicture(pictureUrl);
        } catch (error) {
            console.error("Error reading the file.", error);
        }
    }

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }, [language]);

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

        // set env vars
        setSocketIp(localIp);
        setSocketPort(localPort);
        setName(localName || "");
        setProfileColor(localColor);

        setProfilePhotoUrl(localProfilePicture);

        // send profile update to socket
        const profileUpdatePayload: ProfileUpdatePayload = {
            payloadType: PayloadSubType.profileUpdate,
            clientId: clientId,
            username: localName || "",
            color: localColor,
            pictureUrl: localProfilePicture,
        };
        if (!websocket) {
            throw new Error("Websocket not initialized");
        }
        websocket.send(JSON.stringify(profileUpdatePayload));

        // close modal
        props.setIsOpen(false);
    };

    return (
        <>
            <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg text-black w-full sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2">
                    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 grid grid-cols-8">
                            <div className="col-span-2 my-auto mx-auto">
                                {localProfilePicture ? (
                                    <div className="grid">
                                        <ProfilePicture
                                            clientId={clientId}
                                            pictureUrl={localProfilePicture}
                                            properties={"h-20 w-20 border-2 border-gray-500"}
                                        />
                                        <span className="text-xs bg-red-200 text-center rounded text-gray-600 p-1">
                                            preview
                                        </span>
                                    </div>
                                ) : (
                                    <ProfilePicture
                                        clientId={clientId}
                                        properties="h-20 w-20 border-2 border-gray-500"
                                    />
                                )}
                            </div>
                            <div className="col-span-6">
                                <div>
                                    <label htmlFor="profilePicture">{t("profile_modal_title")}</label>
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
                                            {t("prefer_pic_url")}
                                        </label>
                                    </div>
                                </div>
                                {preferPictureUrl ? (
                                    <input
                                        type="text"
                                        id="profilePicture"
                                        onChange={(e) => setLocalProfilePicture(e.target.value)}
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
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketIp">Socket IP</label>
                            <input
                                type="text"
                                id="socketIp"
                                value={localIp}
                                onChange={(e) => setLocalIp(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketPort">Socket Port</label>
                            <input
                                type="text"
                                id="socketPort"
                                value={localPort}
                                onChange={(e) => setLocalPort(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="languageSelection">{t("language_selection")}</label>
                            <select
                                id="languageSelection"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                            >
                                <option value="de">🇩🇪 Deutsch</option>
                                <option value="en">🇺🇸 Englisch</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <div className="grid">
                                <div>
                                    <label htmlFor="profileColor">Profile Color</label>
                                </div>
                                <div className="grow">
                                    <input
                                        size={20}
                                        type="color"
                                        id="profileColor"
                                        value={"red"}
                                        onChange={(e) => {
                                            setLocalColor(e.target.value);
                                            console.log("FARBE");
                                            console.log(e.target.value);
                                        }}
                                        className="mt-1 ml-2 border border-gray-300 rounded-md p-5 w-32"
                                        style={{ backgroundColor: localColor }}
                                    />
                                </div>
                            </div>
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