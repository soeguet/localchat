import useClientsStore from "../stores/clientsStore";

function ProfilePicture({ clientId }: { clientId: string }) {
    const client = useClientsStore((state) => state.clients.find((c) => c.id === clientId));
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img className="mb-1 h-10 w-10 rounded-full" src={profilePicture} alt={""} />
        </>
    );
}

export default ProfilePicture;
