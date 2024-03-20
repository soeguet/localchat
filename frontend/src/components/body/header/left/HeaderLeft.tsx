import { useState } from "react";
import useClientStore from "../../../../stores/clientStore";
import ProfileMenu from "./ProfileMenu";
import ProfilePictureHandler from "./ProfilePictureHandler";
import useUserStore from "../../../../stores/userStore";

function HeaderLeft() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const clientDbId = useUserStore((state) => state.myId);
    const username = useClientStore(
        (state) =>
            state.clients.find((c) => c.clientDbId === clientDbId)?.clientUsername
    );

    return (
        <div className="relative flex items-center">
            <ProfilePictureHandler
                showMenu={showProfileMenu}
                setShowMenu={setShowProfileMenu}
            />
            <ProfileMenu
                showMenu={showProfileMenu}
                setShowMenu={setShowProfileMenu}
            />
            <span className="ml-3 font-medium">{username}</span>
        </div>
    );
}

export default HeaderLeft;
