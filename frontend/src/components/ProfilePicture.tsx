import useClientsStore from "../stores/clientsStore";
import { RegisteredUser } from "../utils/customTypes";

function ProfilePicture({ clientId }: { clientId: string }) {
    const client = useClientsStore((state) => state.clients.find((client) => client.id === clientId));
    console.log("_____________________________________");
    console.log(client.user);
    console.log("_____________________________________");
    const abc: RegisteredUser = JSON.parse(client.user);

    if (!client) {
        return <div>Client nicht gefunden.</div>;
    }

    return (
        <>
            <p>123{client.username}</p>
            <img className="mb-1 h-10 w-10 rounded-full" src={abc.profilePhotoUrl} alt={abc.username} />
        </>
    );
}

export default ProfilePicture;
