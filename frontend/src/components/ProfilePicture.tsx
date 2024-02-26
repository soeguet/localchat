import useClientsStore from "../stores/clientsStore";
import useFontSizeStore from "../stores/fontSizeStore";
import {useMemo} from "react";

function ProfilePicture({
                            clientId,
                            pictureSizeFactor = 1,
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

    const fontSize = useFontSizeStore((state) => state.fontSize);
    const pictureSize = useMemo(() => fontSize * pictureSizeFactor + 50, [fontSize, pictureSizeFactor]);

    return (
        <>
            <img
                className={`mb-1 rounded-full border-2 border-gray-500 ${properties}`}
                style={{
                    width: `${pictureSize}px`,
                    height: `${pictureSize}px`,
                }}
                src={pictureUrl ? pictureUrl : profilePicture}
                alt={""}
            />
        </>
    );
}

export default ProfilePicture;