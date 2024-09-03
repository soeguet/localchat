import { memo, useEffect, useState } from "react";
import type { ClientId } from "../../utils/types/customTypes";
import {
    DEFAULT_HOVER_COLOR,
    DEFAULT_STROKE_COLOR,
} from "../../utils/variables/variables";

type ProfilePictureProps = {
    pictureHash: string | null;
    clientDbId: ClientId;
    pictureUrl: string | null;
    profilePictureBase64: string | null;
    properties: string | null;
    style: {
        width: string | "40px";
        height: string | "40px";
        borderColor?: string;
        opacity?: string;
    } | null;
};

const ProfilePicture = memo((props: ProfilePictureProps) => {
    // state
    const [hover, setHover] = useState(false);
    const [imageData, setImageData] = useState<string | null>(null);
    // state

    useEffect(() => {

        if (props.profilePictureBase64 === null) {
            return;
        }

        setImageData(props.profilePictureBase64)

    }, [props.profilePictureBase64]);


    if (!imageData) {
        return (
            <img
                data-testid="dummy-profile-picture"
                className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    ...props.style,
                    borderColor: hover
                        ? DEFAULT_HOVER_COLOR
                        : props.style?.borderColor ?? DEFAULT_STROKE_COLOR,
                }}
                src={"logo.png"}
                alt={""}
            />
        );
    }

    return (
        <>
            <img
                data-testid="profile-picture"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    ...props.style,
                    borderColor: hover
                        ? DEFAULT_HOVER_COLOR
                        : props.style?.borderColor ?? DEFAULT_STROKE_COLOR,
                }}
                className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
                src={imageData}
                alt=""
            />
        </>
    );
});

ProfilePicture.displayName = "ProfilePicture";

export { ProfilePicture };
