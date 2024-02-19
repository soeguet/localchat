import { useEffect, useState } from "react";
import useClientsStore from "../stores/clientsStore";

function ProfilePicture({ clientId }: { clientId: string }) {
    const [profilePicture, setProfilePicture] = useState(
        useClientsStore.getState().getClientById(clientId)?.profilePhotoUrl
    );

    useEffect(() => {
        const client = useClientsStore.getState().getClientById(clientId);
        setProfilePicture(client.profilePhotoUrl);
    }, [useClientsStore().clients]);

    return (
        <>
            <img className="mb-1 h-10 w-10 rounded-full" src={profilePicture} alt="Profile picture" />
        </>
    );
}

export default ProfilePicture;
