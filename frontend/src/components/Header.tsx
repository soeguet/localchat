import { useState } from "react";
import { HeaderProps } from "../utils/customTypes";
import { socket } from "../utils/socket";
import useUserStore from "../stores/userStore";
import ProfileMenu from "./ProfileMenu";
import ProfileModal from "./ProfileModal";
import ProfilePicture from "./ProfilePicture";

function Header({ isConnected, unreadMessages, onReconnect }: HeaderProps) {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const clientId = useUserStore((state) => state.myId);
    const username = useUserStore((state) => state.myUsername);

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <ProfilePicture clientId={clientId} />
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
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                >
                    {isConnected ? "Connected" : "Disconnected"}
                </span>
                {!isConnected && (
                    <button
                        onClick={() => onReconnect(socket)}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                        Reconnect
                    </button>
                )}
            </div>
            <div>
                <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${unreadMessages > 0 ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}
                >
                    Unread: {unreadMessages}
                </span>
            </div>
        </div>
    );
}

export default Header;
