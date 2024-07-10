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

export function initializeProfilePictures() {
	// load profile pictures from go sqlite db
	console.log("Clients: ", useClientStore.getState().clients.length);
	GetAllImages()
		.then((pictures) => {
			if (pictures === null || pictures === undefined) {
				throw new Error("pictures is null or undefined");
			}
			const newMap = new Map<ClientId, ProfilePictureObject>();

			for (let i = 0; i < pictures.length; i++) {
				const picture: DbRow = pictures[i] as DbRow;
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

			return newMap;
		})
		.then((newMap) => {
			useProfilePictureStore.getState().setProfilePictureMap(newMap);
		})
		.catch((error) => {
			console.error("error fetching profile pictures", error);
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
