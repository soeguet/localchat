import useClientStore from "../../stores/clientStore";
import React from "react";

type ProfilePictureProps = {
    clientId: string;
    pictureUrl?: string;
    properties?: string;
    style?: {
        width: string | "40px";
        height: string | "40px";
        borderColor?: string;
        opacity?: string;
    };
};

function ProfilePicture(props: ProfilePictureProps) {
    const client = useClientStore((state) =>
        state.clients.find((c) => c.id === props.clientId)
    );
    const profilePicture = client?.profilePhotoUrl;

    return (
        <>
            <img
                style={props.style}
                className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
                src={props.pictureUrl ? props.pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default React.memo(ProfilePicture);
