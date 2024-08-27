import {memo, useEffect, useState} from "react";
import type {ClientId, DbRow} from "../../utils/types/customTypes";
import {GetImageViaImageHash} from "../../../wailsjs/go/main/App";
import {DEFAULT_HOVER_COLOR, DEFAULT_STROKE_COLOR} from "../../utils/variables/variables";
import {errorLogger} from "../../logger/errorLogger";

type ProfilePictureProps = {
    pictureHash: string | null;
    clientDbId: ClientId;
    pictureUrl?: string;
    properties?: string;
    style?: {
        width: string | "40px";
        height: string | "40px";
        borderColor?: string;
        opacity?: string;
    };
};

const ProfilePicture = memo((props: ProfilePictureProps) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [hover, setHover] = useState(false);


    useEffect(() => {

        async function fetchImage() {

            if (props.pictureHash === null) {
                return;
            }

            const response = await GetImageViaImageHash(props.pictureHash) as DbRow
            setImageData(response.Data);
        }

        fetchImage().catch((error) => {
            console.error("Failed to fetch image", error);
            console.error("tried to fetch image with hash", props.pictureHash);
            errorLogger.logError(error);
        });

    }, [props.pictureHash]);

    if (props.pictureHash === "" || imageData === null) {
        return (
            <img
                data-testid="dummy-profile-picture"
                className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    ...props.style,
                    borderColor: hover ? DEFAULT_HOVER_COLOR : (props.style?.borderColor ?? DEFAULT_STROKE_COLOR),
                }}
                src={"logo.png"}
                alt={""}
            />
        )
    }

    return (
        <>
            <img
                data-testid="profile-picture"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    ...props.style,
                    borderColor: hover ? DEFAULT_HOVER_COLOR : (props.style?.borderColor ?? DEFAULT_STROKE_COLOR),
                }}
                className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
                src={imageData}
                alt=""
            />
        </>
    );
});

ProfilePicture.displayName = "ProfilePicture";

export {ProfilePicture};