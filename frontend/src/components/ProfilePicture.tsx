import useClientsStore from "../stores/clientsStore";

function ProfilePicture({
    clientId,
    pictureUrl,
    properties,
}: {
    clientId: string;
    pictureUrl?: string;
    properties?: string;
}) {
    const client = useClientsStore((state) => state.clients.find((c) => c.id === clientId));
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img
                className={`mb-1 h-10 w-10 rounded-full border-2 border-gray-500 ${properties}`}
                src={pictureUrl ? pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default ProfilePicture;
