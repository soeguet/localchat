import { GetAllImages } from "../../wailsjs/go/main/App";
import { useClientStore } from "../stores/clientStore";
import { useProfilePictureStore } from "../stores/profilePictureStore";
import { useWebsocketStore } from "../stores/websocketStore";
import {
	type ProfilePictureObject,
	type ClientId,
	PayloadSubType,
} from "./customTypes";

type DbRow = {
	ImageHash: string;
	ClientDbId: string;
	Data: string;
};

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
