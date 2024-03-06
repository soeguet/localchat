import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import useUserStore from "../../../../stores/userStore";
import useWebsocketStore from "../../../../stores/websocketStore";
import {
    PayloadSubType,
    ProfileUpdatePayload,
} from "../../../../utils/customTypes";
import useClientsStore from "../../../../stores/clientStore";
import { useTranslation } from "react-i18next";
import i18n from "../../../../config/i18n";
import useFontSizeStore from "../../../../stores/fontSizeStore";

type ProfileModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileModal(props: ProfileModalProps) {
    const { t } = useTranslation();
    // just in case
    if (!props.isOpen) return null;

    const {
        myId,
        myUsername,
        socketIp,
        socketPort,
        setMyColor,
        setSocketIp,
        setSocketPort,
        setMyUsername,
        setMyProfilePhoto,
    } = useUserStore();
    const profileColor = useClientsStore(
        (state) => state.clients.find((c) => c.id === myId)?.clientColor
    );
    const websocket = useWebsocketStore((state) => state.ws);
    const { fontSize, setFontSize } = useFontSizeStore();

    const [preferPictureUrl, setPreferPictureUrl] = useState(false);
    const [localName, setLocalName] = useState(myUsername);
    const [localIp, setLocalIp] = useState(socketIp);
    const [localPort, setLocalPort] = useState(socketPort);
    const [localColor, setLocalColor] = useState(profileColor);
    const [localProfilePicture, setLocalProfilePicture] = useState("");
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0] || null;
        if (!file) {
            //console.log("No file selected.");
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

    useEffect(() => {
        i18n.changeLanguage(language)
            .then(() => {
                localStorage.setItem("language", language);
            })
            .catch((e) => {
                console.error("Error changing language", e);
            });
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
        setMyUsername(localName || "");
        setMyColor(localColor || "");
        setMyProfilePhoto(localProfilePicture);

        // send profile update to socket
        const profileUpdatePayload: ProfileUpdatePayload = {
            payloadType: PayloadSubType.profileUpdate,
            clientId: myId,
            username: localName || "",
            color: localColor || "",
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
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full rounded-lg bg-white p-4 text-black sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-3 gap-4"
                    >
                        <div className="col-span-3 grid grid-cols-8">
                            <div className="col-span-2 mx-auto my-auto">
                                {localProfilePicture ? (
                                    <div className="grid">
                                        <ProfilePicture
                                            clientId={myId}
                                            pictureUrl={localProfilePicture}
                                            style={{
                                                width: "70px",
                                                height: "70px",
                                                borderColor:
                                                    localColor || "lightgrey",
                                            }}
                                        />
                                        <span className="rounded bg-red-200 p-1 text-center text-xs text-gray-600">
                                            preview
                                        </span>
                                    </div>
                                ) : (
                                    <ProfilePicture
                                        clientId={myId}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderColor:
                                                localColor || "lightgrey",
                                        }}
                                    />
                                )}
                            </div>
                            <div className="col-span-6">
                                <div>
                                    <label htmlFor="profilePicture">
                                        {t("profile_modal_title")}
                                    </label>
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            aria-describedby="comments-description"
                                            onChange={(e) =>
                                                setPreferPictureUrl(
                                                    e.target.checked
                                                )
                                            }
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="comments"
                                            className="ml-3 font-medium text-gray-500"
                                        >
                                            {t("prefer_pic_url")}
                                        </label>
                                    </div>
                                </div>
                                {preferPictureUrl ? (
                                    <input
                                        type="text"
                                        id="profilePicture"
                                        onChange={(e) =>
                                            setLocalProfilePicture(
                                                e.target.value
                                            )
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
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={localName}
                                onChange={(e) => setLocalName(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketIp">Socket IP</label>
                            <input
                                type="text"
                                id="socketIp"
                                value={localIp}
                                onChange={(e) => setLocalIp(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="socketPort">Socket Port</label>
                            <input
                                type="text"
                                id="socketPort"
                                value={localPort}
                                onChange={(e) => setLocalPort(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="languageSelection">
                                {t("language_selection")}
                            </label>
                            <select
                                id="languageSelection"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            >
                                <option value="de">🇩🇪 Deutsch</option>
                                <option value="en">🇺🇸 Englisch</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <div className="grid">
                                <div>
                                    <label htmlFor="profileColor">
                                        Profile Color
                                    </label>
                                </div>
                                <div className="grow">
                                    <input
                                        type="color"
                                        id="profileColor"
                                        onChange={(e) => {
                                            setLocalColor(e.target.value);
                                        }}
                                        className="ml-2 mt-1 w-32 rounded-md border border-gray-300 p-5"
                                        style={{
                                            backgroundColor: localColor,
                                            color: localColor,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <label htmlFor="fontSize">Font Size</label>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) =>
                                    setFontSize(Number(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                            <button
                                type="submit"
                                className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => props.setIsOpen(false)}
                                type="button"
                                className="ml-2 mt-2 rounded-lg bg-gray-500 px-4 py-2 text-white"
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
