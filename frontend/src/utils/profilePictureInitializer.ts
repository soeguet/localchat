import { GetAllImages } from "../../wailsjs/go/main/App";
import { useClientStore } from "../stores/clientStore";
import { useProfilePictureStore } from "../stores/profilePictureStore";
import { useWebsocketStore } from "../stores/websocketStore";
import {
	type ProfilePictureObject,
	type ClientId,
	PayloadSubType,
} from "./customTypes";

export function initializeProfilePictures() {
	// load profile pictures from go sqlite db
	console.log("Clients: ", useClientStore.getState().clients.length);
	GetAllImages()
		.then((pictures) => {
			const profilePictures = pictures as ProfilePictureObject[];
			const newMap = new Map<ClientId, ProfilePictureObject>();

			for (let i = 0; i < profilePictures.length; i++) {
				console.log("profile picture", profilePictures[i]);
				const profilePicture: ProfilePictureObject = profilePictures[i];
				const clientProfilePictureHash = useClientStore
					.getState()
					.getClientHashById(profilePicture.clientDbId);

				if (profilePicture.imageHash === clientProfilePictureHash) {
					newMap.set(profilePicture.clientDbId, profilePicture);
				} else {
					fetchProfilePictureFromWebsocket(profilePicture.clientDbId);
				}
			}

			return newMap;
		})
		.then((newMap) => {
			useProfilePictureStore.getState().setProfilePictureMap(newMap);
		});
}

function fetchProfilePictureFromWebsocket(clientDbId: ClientId) {
	const ws = useWebsocketStore.getState().ws;
	if (ws === null) {
		throw new Error("Websocket connection is not available");
	}

	console.log("fetching profile picture for client", clientDbId);

	ws.send(
		JSON.stringify({
			payloadType: PayloadSubType.fetchProfilePicture,
			clientDbId: clientDbId,
		}),
	);
}
