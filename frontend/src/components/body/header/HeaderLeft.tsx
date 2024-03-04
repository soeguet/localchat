import { useState } from "react";
import useUserStore from "../../../stores/userStore";
import useClientsStore from "../../../stores/clientsStore";
import ProfileMenu from "../../ProfileMenu";
import ProfileModal from "../../ProfileModal";
import ProfilePicture from "../../ProfilePicture";
import useDoNotDisturbStore from "../../../stores/doNotDisturbStore";
import DoNotDisturb from "../../svgs/disturb/DoNotDisturb";

function HeaderLeft() {
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const clientId = useUserStore((state) => state.myId);
    const clientColor = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.clientColor);
    const username = useClientsStore((state) => state.clients.find((c) => c.id === clientId)?.username);
    const [profilePictureHovered, setProfilePictureHovered] = useState<boolean>(false);
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

    return (
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
    );
}

export default HeaderLeft;
