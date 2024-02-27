import useClientsStore from "../stores/clientsStore";

function ProfilePicture({
                            clientId,
                            pictureUrl,
                            properties,
                            style = {width: "40px", height: "40px"}
                        }: {
    clientId: string;
    pictureSizeFactor?: number;
    pictureUrl?: string;
    properties?: string;
    style?: {
        width: string
        height: string
        borderColor?: string
    };
}) {
    const client = useClientsStore((state) => state.clients.find((c) => c.id === clientId));
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img
                style={style}
                className={`rounded-full border-2 border-gray-500 ${properties}`}
                src={pictureUrl ? pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default ProfilePicture;