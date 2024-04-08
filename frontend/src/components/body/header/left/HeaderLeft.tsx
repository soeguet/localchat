import {useState} from "react";
import {ProfileMenu} from "./ProfileMenu";
import {ProfilePictureHandler} from "./ProfilePictureHandler";
import {ClientName} from "./ClientName";

function HeaderLeft() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className="relative flex items-center" data-testid="header-left-div">
            <ProfilePictureHandler
                showMenu={showProfileMenu}
                setShowMenu={setShowProfileMenu}
            />
            <ProfileMenu
                showMenu={showProfileMenu}
                setShowMenu={setShowProfileMenu}
            />
            <ClientName/>
        </div>
    );
}

export {HeaderLeft};