import { DoNotDisturb } from "../../../svgs/disturb/DoNotDisturb";
import { useDoNotDisturbStore } from "../../../../stores/doNotDisturbStore";
import { useState } from "react";
import { useClientStore } from "../../../../stores/clientStore";
import { useUserStore } from "../../../../stores/userStore";
import { ProfilePicture } from "../../../reuseable/ProfilePicture";

type ProfilePictureHandlerProps = {
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
};

/**
 * checks if the user is in do not disturb mode and displays the appropriate profile picture
 */
function ProfilePictureHandler(props: ProfilePictureHandlerProps) {
    const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);
    const clientDbId = useUserStore((state) => state.myId);
    const clientColor = useClientStore(
        (state) =>
            state.clients.find((c) => c.clientDbId === clientDbId)?.clientColor
    );
    const [profilePictureHovered, setProfilePictureHovered] = useState(false);
    const borderColorCondition = `${!profilePictureHovered ? clientColor : "cyan" || "lightgrey"}`;
    const profilePictureStyle = {
        width: "70px",
        height: "70px",
        borderColor: borderColorCondition,
    };
    return (
        <>
            <div
                className="cursor-pointer"
                onClick={() => props.setShowMenu(!props.showMenu)}
                onMouseEnter={() => setProfilePictureHovered(true)}
                onMouseLeave={() => setProfilePictureHovered(false)}
            >
                {doNotDisturb ? (
                    <DoNotDisturb style={profilePictureStyle} />
                ) : (
                    <ProfilePicture
                        clientDbId={clientDbId}
                        style={profilePictureStyle}
                    />
                )}
            </div>
        </>
    );
}

export { ProfilePictureHandler };
