import { errorLogger } from "../logger/errorLogger";
import useSettingsStore from "../stores/settingsStore";
import { useUserStore } from "../stores/userStore";
import { useWebsocketStore } from "../stores/websocketStore";
import {
	type ClientUpdatePayload,
	PayloadSubType,
	type ClientUpdatePayloadV2,
	type NewProfilePicturePayload,
} from "./customTypes";
import { generateUnixTimestampFnv1aHash } from "./hashGenerator";

// TODO implement hasing for profile pictures instead of sending the whole image all the time
export function handleProfileSettingsUpdatesWithSocketV2() {
	const wsReference = useWebsocketStore.getState().ws;
	if (wsReference === null) {
		errorLogger.logError(new Error("Websocket is not initialized"));
		return;
	}

	const newImageHash = generateUnixTimestampFnv1aHash();

	profileUpdate(newImageHash, wsReference);
	profilePictureUpdate(newImageHash, wsReference);
}

function profileUpdate(newImageHash: string, wsReference: WebSocket) {
	// the socket is keeping track of the client id (cannot be changed by user), username, profile color and profile picture
	const newUsername = useSettingsStore.getState().localName;
	const newColor = useSettingsStore.getState().localColor;
	const newProfilePicture = newImageHash;

	const clientUpdatePayload: ClientUpdatePayloadV2 = {
		payloadType: PayloadSubType.profileUpdateV2,
		clientUsername: newUsername || useUserStore.getState().myUsername,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor || useUserStore.getState().myColor,
		clientProfileImage:
			newProfilePicture || useUserStore.getState().myProfilePhoto,
		availability: useSettingsStore.getState().availability,
	};

	wsReference.send(JSON.stringify(clientUpdatePayload));
}

function profilePictureUpdate(newImageHash: string, wsReference: WebSocket) {
	const picturePayload: NewProfilePicturePayload = {
		payloadType: PayloadSubType.newProfilePicture,
		clientDbId: useUserStore.getState().myId,
		imageHash: newImageHash,
		data: useSettingsStore.getState().localProfilePicture,
	};

	wsReference.send(JSON.stringify(picturePayload));
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
		errorLogger.logError(new Error("Websocket is not initialized"));
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
