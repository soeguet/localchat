import useClientsStore from "../stores/clientsStore";
import { RegisteredUser, UserDatabaseRow } from "../utils/customTypes";

function ProfilePicture({ clientId }: { clientId: string }) {
    const clientsList: UserDatabaseRow[] = useClientsStore((state) => state.clients);
    const client = clientsList.find((client) => client.id === clientId)?.user;
    const profilePicture = client?.username;
    console.log("ProfilePicture.tsx: profilePicture", client);

    console.log("ProfilePicture.tsx: clientsList", clientsList.length);
    return (
        <>
            <img className="mb-1 h-10 w-10 rounded-full" src={profilePicture} alt={""} />
        </>
    );
}

export default ProfilePicture;
