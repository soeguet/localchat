import {NewProfilePicturePayloadSchema, ProfilePictureObject} from "../types/customTypes";
import {errorLogger} from "../../logger/errorLogger";
import {usePictureCacheStore} from "../../stores/pictureCacheStore";
import {PersistImage} from "../../../wailsjs/go/main/App";

export async function newProfilePictureHandler(event: MessageEvent) {

    const newProfilePictureValidation = NewProfilePicturePayloadSchema.safeParse(JSON.parse(event.data));

    if (newProfilePictureValidation.success) {
        const profilePictureObject: ProfilePictureObject = {
            clientDbId: newProfilePictureValidation.data.clientDbId,
            imageHash: newProfilePictureValidation.data.imageHash,
            data: newProfilePictureValidation.data.data,
        };

        usePictureCacheStore
            .getState()
            .addToProfilePictureMap(
                profilePictureObject.clientDbId,
                profilePictureObject,
            );
        usePictureCacheStore
            .getState()
            .removeFromNoProfilePictureAvailableMap(
                profilePictureObject.clientDbId,
            );

        await PersistImage(profilePictureObject);

    } else {

        console.error("Failed to parse new profile picture payload");
        errorLogger.logError(new Error("Failed to parse new profile picture payload"));
        throw new Error("Failed to parse new profile picture payload");

    }
}