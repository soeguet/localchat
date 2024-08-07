import { GetAllImages } from "../../wailsjs/go/main/App";
import { useClientStore } from "../stores/clientStore";
import { useProfilePictureStore } from "../stores/profilePictureStore";
import { useWebsocketStore } from "../stores/websocketStore";
import {
	type ProfilePictureObject,
	type ClientId,
	PayloadSubType,
	type ClientEntity,
	type Hash,
} from "./customTypes";
import { retrieveProfilePicturesFromSocket } from "./socket";

type DbRow = {
	ImageHash: string;
	ClientDbId: string;
	Data: string;
};

const checkHashes = (client: ClientEntity, hash: Hash | undefined) => {
	if (client.clientProfileImage === undefined) {
		return false;
	}
	if (hash === undefined) {
		return false;
	}
	return client.clientProfileImage === hash;
};

export async function processClientsProfilePictures(clients: ClientEntity[]) {
	const allImageHashes = useProfilePictureStore.getState().profilePictureMap;
	const noProfilePictureAvailableMap =
		useProfilePictureStore.getState().noProfilePictureAvailableMap;

	for (const client of clients) {
		// added extra cache, else logger will get spammed
		if (noProfilePictureAvailableMap.has(client.clientDbId)) {
			continue;
		}

		// if the client is not registered in cache yet (since this data is from the sqlite db)
		if (!allImageHashes.has(client.clientDbId)) {
			// ask for the profile picture
			retrieveProfilePicturesFromSocket(client.clientDbId);
			useProfilePictureStore
				.getState()
				.addToNoProfilePictureAvailableMap(client.clientDbId);
			continue;
		}

		// if the hash from the server does not match the hash in cache
		if (
			!checkHashes(
				client,
				allImageHashes.get(client.clientDbId)?.imageHash,
			)
		) {
			retrieveProfilePicturesFromSocket(client.clientDbId);
		}
	}
}
export async function initializeProfilePictures() {
	// load profile pictures from go sqlite db
	const allPictures = await GetAllImages();

	if (allPictures === null || allPictures === undefined) {
		return;
	}

	const newMap = new Map<ClientId, ProfilePictureObject>();

	for (let i = 0; i < allPictures.length; i++) {
		const picture: DbRow = allPictures[i] as DbRow;
		const profilePicture: ProfilePictureObject = {
			clientDbId: picture.ClientDbId,
			imageHash: picture.ImageHash,
			data: picture.Data,
		};
		const clientProfilePictureHash = useClientStore
			.getState()
			.getClientHashById(profilePicture.clientDbId);

		if (profilePicture.imageHash === clientProfilePictureHash) {
			newMap.set(profilePicture.clientDbId, profilePicture);
		} else {
			fetchProfilePictureFromWebsocket(profilePicture.clientDbId);
		}
	}

	useProfilePictureStore.getState().setProfilePictureMap(newMap);
}

function fetchProfilePictureFromWebsocket(clientDbId: ClientId) {
	const ws = useWebsocketStore.getState().ws;
	if (ws === null) {
		throw new Error("Websocket connection is not available");
	}

	ws.send(
		JSON.stringify({
			payloadType: PayloadSubType.fetchProfilePicture,
			clientDbId: clientDbId,
		}),
	);
}
