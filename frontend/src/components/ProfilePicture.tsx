import useClientsStore from "../stores/clientsStore";

function ProfilePicture({
    clientId,
    pictureUrl,
    properties,
}: {
    clientId: string;
    pictureSizeFactor?: number;
    pictureUrl?: string;
    properties?: string;
}) {
    const client = useClientsStore((state) => state.clients.find((c) => c.id === clientId));
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img
                className={`rounded-full border-2 border-gray-500 ${properties}`}
                style={{
                    width: "70px",
                    height: "70px",
                }}
                src={pictureUrl ? pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default ProfilePicture;