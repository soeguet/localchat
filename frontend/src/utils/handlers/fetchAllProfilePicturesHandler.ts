import {ClientId, FetchAllProfilePicturesPayloadSchema, ProfilePictureObject} from "../types/customTypes";
import {errorLogger} from "../../logger/errorLogger";
import {PersistImage} from "../../../wailsjs/go/main/App";
import {useProfilePictureStore} from "../../stores/profilePictureStore";

export async function fetchAllProfilePicturesHandler(event: MessageEvent) {

    const fetchAllProfilePicturesValidation = FetchAllProfilePicturesPayloadSchema.safeParse(JSON.parse(event.data));

    if (fetchAllProfilePicturesValidation.success) {
        if (fetchAllProfilePicturesValidation.data.profilePictures === undefined) {
            throw new Error("Profile pictures are undefined");
        }
        const profilePictures: ProfilePictureObject[] = fetchAllProfilePicturesValidation.data.profilePictures;

        const newMap = new Map<ClientId, ProfilePictureObject>();

        for (let i = 0; i < profilePictures.length; i++) {
            const profilePicture: ProfilePictureObject = profilePictures[i];

            // persist to goland sqlite db
            await PersistImage(profilePicture);

            newMap.set(profilePicture.clientDbId, profilePicture);
        }

        useProfilePictureStore.getState().setProfilePictureMap(newMap);
    }   else {

        console.error("Failed to parse fetch all profile pictures payload");
        errorLogger.logError(new Error("Failed to parse fetch all profile pictures payload"));
        throw new Error("Failed to parse fetch all profile pictures payload");

    }
}