import {usePictureCacheStore} from "../../stores/pictureCacheStore";
import {type ClientEntity, type Hash,} from "../types/customTypes";
import {retrieveProfilePicturesFromSocket} from "../socket/socket";

const checkHashes = (client: ClientEntity, hash: Hash | undefined) => {
    if (client.clientProfilePictureHash === undefined) {
        return false;
    }
    if (hash === undefined) {
        return false;
    }
    return client.clientProfilePictureHash === hash;
};

export async function processClientsProfilePictures(clients: ClientEntity[]) {
    const allImageHashes = usePictureCacheStore.getState().profilePictureMap;
    const noProfilePictureAvailableMap =
        usePictureCacheStore.getState().noProfilePictureAvailableMap;

    for (const client of clients) {
        // added extra cache, else logger will get spammed
        if (noProfilePictureAvailableMap.has(client.clientDbId)) {
            continue;
        }

        // if the client is not registered in cache yet (since this data is from the sqlite db)
        if (!allImageHashes.has(client.clientDbId)) {
            // ask for the profile picture
            retrieveProfilePicturesFromSocket(client.clientDbId);
            usePictureCacheStore
                .getState()
                .addToNoProfilePictureAvailableMap(client.clientDbId);
            continue;
        }

        // if the hash from the server does not match the hash in cache
        if (
            !checkHashes(client, allImageHashes.get(client.clientDbId)?.imageHash)
        ) {
            retrieveProfilePicturesFromSocket(client.clientDbId);
        }
    }
}