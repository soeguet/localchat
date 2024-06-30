import useSettingsStore from "../stores/settingsStore";
import { useUserStore } from "../stores/userStore";
import { useWebsocketStore } from "../stores/websocketStore";
import {
	type ClientUpdatePayload,
	PayloadSubType,
	type ClientUpdatePayloadV2,
} from "./customTypes";

// TODO implement hasing for profile pictures instead of sending the whole image all the time
export function handleProfileSettingsUpdatesWithSocketV2() {
	// the socket is keeping track of the client id (cannot be changed by user), username, profile color and profile picture
	const newUsername = useSettingsStore.getState().localName;
	const newColor = useSettingsStore.getState().localColor;
	const newProfilePicture = useSettingsStore.getState().localProfilePicture;

	const clientUpdatePayload: ClientUpdatePayloadV2 = {
		payloadType: PayloadSubType.profileUpdateV2,
		clientUsername: newUsername || useUserStore.getState().myUsername,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor || useUserStore.getState().myColor,
		clientProfileImage:
			newProfilePicture || useUserStore.getState().myProfilePhoto,
		availability: useSettingsStore.getState().availability,
	};

	const wsReference = useWebsocketStore.getState().ws;

	if (wsReference !== null) {
		wsReference.send(JSON.stringify(clientUpdatePayload));
	} else {
		console.error("Websocket is not initialized");
	}
}

export function handleProfileSettingsUpdatesWithSocket() {
	// the socket is keeping track of the client id (cannot be changed by user), username, profile color and profile picture
	const newUsername = useSettingsStore.getState().localName;
	const newColor = useSettingsStore.getState().localColor;
	const newProfilePicture = useSettingsStore.getState().localProfilePicture;

	const clientUpdatePayload: ClientUpdatePayload = {
		payloadType: PayloadSubType.profileUpdate,
		clientUsername: newUsername || useUserStore.getState().myUsername,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor || useUserStore.getState().myColor,
		clientProfileImage:
			newProfilePicture || useUserStore.getState().myProfilePhoto,
		availability: useSettingsStore.getState().availability,
	};

	const wsReference = useWebsocketStore.getState().ws;

	if (wsReference !== null) {
		wsReference.send(JSON.stringify(clientUpdatePayload));
	} else {
		console.error("Websocket is not initialized");
	}

	// useUserStore.getState().setMyUsername(clientUpdatePayload.clientUsername);
	// if (clientUpdatePayload.clientColor) {
	//     useUserStore.getState().setMyColor(clientUpdatePayload.clientColor);
	// }
	// if (clientUpdatePayload.clientProfileImage) {
	//     useUserStore
	//         .getState()
	//         .setMyProfilePhoto(clientUpdatePayload.clientProfileImage);
	// }
}
