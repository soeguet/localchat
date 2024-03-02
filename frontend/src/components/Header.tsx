import { useState } from "react";
import useUserStore from "../stores/userStore";
import useClientsStore from "../stores/clientsStore";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import ProfilePicture from "./ProfilePicture";
import { t } from "i18next";
import i18n from "../config/i18n";
import FontSizePopup from "./FontSizePopup";
import GermanFlag from "./svgs/flags/GermanFlag";
import AmericanFlag from "./svgs/flags/AmericanFlag";
import UnreadMessages from "./svgs/messages/UnreadMessages";
import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import DoNotDisturb from "./svgs/disturb/DoNotDisturb";
import Connected from "./svgs/status/Connected";
import Disconnected from "./svgs/status/Disconnected";
import useWebsocketStore from "../stores/websocketStore";
import { WindowReloadApp } from "../../wailsjs/runtime";
import useUnseenMessageCountStore from "../stores/unseenMessageCountStore";

function Header() {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const clientId = useUserStore((state) => state.myId);
    const clientColor = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.clientColor);
    const username = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.username);
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);
    const [profilePictureHovered, setProfilePictureHovered] = useState<boolean>(false);
    const ws = useWebsocketStore((state) => state.ws);
    const unseenMessageCount = useUnseenMessageCountStore((state) => state.unseenMessageCount);

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
        <div
            className={`${doNotDisturb ? "bg-orange-700 text-white" : "bg-gray-700 text-white"} pt-1 pb-2 px-4 flex justify-between items-center border-b-2 border-b-black`}
        >
            <div className="flex items-center">
                <div
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    onMouseEnter={() => setProfilePictureHovered(true)}
                    onMouseLeave={() => setProfilePictureHovered(false)}
                >
                    {doNotDisturb ? (
                        <div className="rounded-full border-2 border-black bg-white transition duration-300 ease-in-out hover:border-cyan-500">
                            <DoNotDisturb />
                        </div>
                    ) : (
                        <ProfilePicture
                            clientId={clientId}
                            style={{
                                width: "70px",
                                height: "70px",
                                borderColor: !profilePictureHovered ? clientColor : "cyan" || "lightgrey",
                            }}
                        />
                    )}
                </div>
                {showProfileMenu && (
                    <ProfileMenu
                        showMenu={showProfileMenu}
                        setShowMenu={setShowProfileMenu}
                        setShowProfileModal={setShowProfileModal}
                    />
                )}
                {showProfileModal && <ProfileModal isOpen={showProfileModal} setIsOpen={setShowProfileModal} />}
                <span className="ml-3 font-medium">{username}</span>
            </div>
            <div>
                {ws?.readyState === ws?.OPEN ? (
                    <div className="rounded-full border-2 border-black">
                        <Connected />
                    </div>
                ) : (
                    <div className="flex">
                        <Disconnected />
                        <button
                            onClick={() => WindowReloadApp()}
                            className="ml-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                        >
                            {t("button_reconnect")}
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div>
                    {unseenMessageCount > 0 && (
                        <button className="rounded-full border-2 border-black text-white hover:bg-gray-500">
                            <UnreadMessages />
                        </button>
                    )}
                </div>
                <div className="mx-3">
                    <FontSizePopup />
                </div>
                <div>
                    <button
                        onClick={() => switchLanguage()}
                        className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
                    >
                        {i18n.language === "en" ? <AmericanFlag /> : <GermanFlag />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
