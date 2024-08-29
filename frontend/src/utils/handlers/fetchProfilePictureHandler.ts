import {ProfilePictureObject, ProfilePicturePayloadSchema} from "../types/customTypes";
import {PersistImage} from "../../../wailsjs/go/main/App";
import {usePictureCacheStore} from "../../stores/pictureCacheStore";
import {errorLogger} from "../../logger/errorLogger";

export async function fetchProfilePictureHandler(event: MessageEvent) {

    const profilePictureValidation = ProfilePicturePayloadSchema.safeParse(JSON.parse(event.data));

    if (profilePictureValidation.success) {

        const profilePictureObject: ProfilePictureObject = {
            clientDbId: profilePictureValidation.data.clientDbId,
            imageHash: profilePictureValidation.data.imageHash,
            data: profilePictureValidation.data.data,
        };

        const updateMap = usePictureCacheStore.getState().profilePictureMap;
        updateMap.set(profilePictureObject.clientDbId, profilePictureObject);

        // persist in local cache - zustand
        usePictureCacheStore.getState().setProfilePictureMap(updateMap);

        // persist to goland sqlite db
        await PersistImage(profilePictureObject);

    } else {

        console.error("Failed to parse fetch profile picture payload");
        errorLogger.logError(new Error("Failed to parse fetch profile picture payload"));
        throw new Error("Failed to parse fetch profile picture payload");

    }
}