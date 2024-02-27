import {useState} from "react";
import {HeaderProps} from "../utils/customTypes";
import useUserStore from "../stores/userStore";
import useClientsStore from "../stores/clientsStore";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import ProfilePicture from "./ProfilePicture";
import {t} from "i18next";
import i18n from "../config/i18n";
import FontSizePopup from "./FontSizePopup";
import GermanFlag from "./svgs/flags/GermanFlag";
import AmericanFlag from "./svgs/flags/AmericanFlag";
import UnreadMessages from "./svgs/messages/UnreadMessages";
import useDoNotDisturbStore from "../stores/doNotDisturbStore";
import DoNotDisturb from "./svgs/disturb/DoNotDisturb";
import Connected from "./svgs/status/Connected";
import Disconnected from "./svgs/status/Disconnected";
import {socket} from "../utils/socket";

function Header({isConnected, unreadMessages, onReconnect}: HeaderProps) {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const clientId = useUserStore((state) => state.myId);
    const username = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.username);
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

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
            className={`${doNotDisturb ? "bg-orange-700 text-white" : "bg-gray-700 text-white"} pt-1 pb-2 px-4 flex justify-between items-center`}>
            <div className="flex items-center">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    {doNotDisturb ?
                        <div className="bg-white rounded-full">
                            <DoNotDisturb />
                        </div>
                        :
                        <ProfilePicture clientId={clientId} pictureSizeFactor={1.5} />
                    }

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
                {isConnected ?
                    <Connected />
                    :
                    <div className="flex">
                        <Disconnected />
                        <button
                            onClick={() => onReconnect(socket)}
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                            {t("button_reconnect")}
                        </button>
                    </div>
                }
            </div>
            <div className="flex justify-between items-center">
                <div>
                    {unreadMessages > 0 &&
                        <button
                            className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-2 rounded "
                        >
                            <UnreadMessages />
                        </button>
                    }
                </div>
                <div className="mx-3">
                    <FontSizePopup />
                </div>
                <div>
                    <button
                        onClick={() => switchLanguage()}
                        className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-2 rounded "
                    >
                        {i18n.language === "en" ?
                            <AmericanFlag />
                            :
                            <GermanFlag />
                        }
                    </button>

                </div>
            </div>
        </div>
    )
        ;
}

export default Header;