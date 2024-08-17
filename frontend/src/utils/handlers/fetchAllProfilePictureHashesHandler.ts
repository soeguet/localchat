import {AllProfilePictureHashesPayloadSchema, ClientId, Hash} from "../customTypes";
import {errorLogger} from "../../logger/errorLogger";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import {retrieveProfilePicturesFromSocket} from "../socket";

export function fetchAllProfilePictureHashesHandler(event: MessageEvent) {

    const fetchAllProfilePictureHashesValidation = AllProfilePictureHashesPayloadSchema.safeParse(JSON.parse(event.data));

    if (fetchAllProfilePictureHashesValidation.success) {
        if (fetchAllProfilePictureHashesValidation.data.profilePictureHashes === undefined) {
            throw new Error("Profile picture hashes are undefined");
        }

        const profilePictureMap = useProfilePictureStore.getState().profilePictureMap;

        for (const profilePictureHash of fetchAllProfilePictureHashesValidation.data.profilePictureHashes) {

            const hash: Hash = profilePictureHash.imageHash;
            const clientDbId: ClientId = profilePictureHash.clientDbId;

            if (!profilePictureMap.has(clientDbId)) {

                // ask for the profile picture
                retrieveProfilePicturesFromSocket(clientDbId);

            } else {

                // check if hash from payload matches hash in map
                const profilePicture = profilePictureMap.get(clientDbId);

                if (profilePicture && profilePicture.imageHash !== hash) {
                    // ask for the new profile picture
                    retrieveProfilePicturesFromSocket(clientDbId);
                }

            }
        }

    } else {

        console.error("Failed to parse fetch all profile picture hashes payload");
        errorLogger.logError(new Error("Failed to parse fetch all profile picture hashes payload"));
        throw new Error("Failed to parse fetch all profile picture hashes payload");

    }
}