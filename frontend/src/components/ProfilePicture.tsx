import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";

function ProfilePicture() {
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        async function getProfilePicture() {
            const profilePicture = useUserStore.getState().myProfilePhoto;
            setProfilePicture(profilePicture);
        }
        getProfilePicture();
    }, []);

    useEffect(() => {
        console.log("Profile Picture update");
        setProfilePicture(useUserStore.getState().myProfilePhoto);
    }, [useUserStore().myProfilePhoto]);

    return (
        <>
            <img className="mb-1 h-10 w-10 rounded-full" src={profilePicture} alt="Profile picture" />
        </>
    );
}

export default ProfilePicture;
