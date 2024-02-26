import {useState} from "react";
import {HeaderProps} from "../utils/customTypes";
import {socket} from "../utils/socket";
import useUserStore from "../stores/userStore";
import useClientsStore from "../stores/clientsStore";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import ProfilePicture from "./ProfilePicture";
import {t} from "i18next";
import i18n from "../config/i18n";
import FontSizePopup from "./FontSizePopup";

function Header({isConnected, unreadMessages, onReconnect}: HeaderProps) {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const clientId = useUserStore((state) => state.myId);
    const username = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.username);

    function switchLanguage() {
        const language_selected = localStorage.getItem("language");
        if (language_selected === "en") {
            i18n.changeLanguage("de");
            localStorage.setItem("language", "de");
        } else {
            i18n.changeLanguage("en");
            localStorage.setItem("language", "en");
        }
    }

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <ProfilePicture clientId={clientId} pictureSizeFactor={1.5} />
                </div>
                {showProfileMenu && (
                    <ProfileMenu
                        showMenu={showProfileMenu}
                        setShowMenu={setShowProfileMenu}
                        setShowProfileModal={setShowProfileModal}
                    />
                )}
                {showProfileModal && <ProfileModal isOpen={showProfileModal} setIsOpen={setShowProfileModal} />}
                <span className="font-medium ml-3">{username}</span>
            </div>
            <div>
                <span
                    className={`px-3 py-1 inline-flex leading-5 font-semibold rounded-full ${isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                >
                    {isConnected ? t("status_connected") : t("status_disconnected")}
                </span>
                {!isConnected && (
                    <button
                        onClick={() => onReconnect(socket)}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                        {t("button_reconnect")}
                    </button>
                )}
            </div>
            <div className="flex">
                <div>
                    <span
                        className={`px-3 py-1 inline-flex leading-5 rounded-full ${unreadMessages > 0 ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
                    >
                        {t("button_unread") + ": "}
                        {unreadMessages}
                    </span>
                </div>
                <div className="ml-4">
                    <FontSizePopup />
                </div>
                <div
                    onClick={() => switchLanguage()}
                    className="mx-2 px-2 cursor-pointer rounded-full hover:bg-cyan-50 transition"
                >
                    {t("selected_language")}
                </div>
            </div>
        </div>
    );
}

export default Header;