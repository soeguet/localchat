import {ProfilePictureObject, ProfilePicturePayloadSchema, ProfilePictureSchema} from "../customTypes";
import {PersistImage} from "../../../wailsjs/go/main/App";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import {errorLogger} from "../../logger/errorLogger";

export async function fetchProfilePictureHandler(event: MessageEvent) {

    const profilePictureValidation = ProfilePicturePayloadSchema.safeParse(JSON.parse(event.data));

    if (profilePictureValidation.success) {

        const profilePictureObject: ProfilePictureObject = {
            clientDbId: profilePictureValidation.data.clientDbId,
            imageHash: profilePictureValidation.data.imageHash,
            data: profilePictureValidation.data.data,
        };

        const updateMap = useProfilePictureStore.getState().profilePictureMap;
        updateMap.set(profilePictureObject.clientDbId, profilePictureObject);

        // persist in local cache - zustand
        useProfilePictureStore.getState().setProfilePictureMap(updateMap);

        // persist to goland sqlite db
        await PersistImage(profilePictureObject);

    } else {

        console.error("Failed to parse fetch profile picture payload");
        errorLogger.logError(new Error("Failed to parse fetch profile picture payload"));
        throw new Error("Failed to parse fetch profile picture payload");

    }
}