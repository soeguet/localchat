import useClientsStore from "../stores/clientsStore";
import React from "react";

function ProfilePicture({
    clientId,
    pictureUrl,
    properties,
    style = { width: "40px", height: "40px" },
}: {
    clientId: string;
    pictureSizeFactor?: number;
    pictureUrl?: string;
    properties?: string;
    style?: {
        width: string;
        height: string;
        borderColor?: string;
        opacity?: string;
    };
}) {
    const client = useClientsStore((state) => state.clients.find((c) => c.id === clientId));
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img
                style={style}
                className={`rounded-full border-2 ${properties} transition ease-in-out duration-300`}
                src={pictureUrl ? pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default React.memo(ProfilePicture);
