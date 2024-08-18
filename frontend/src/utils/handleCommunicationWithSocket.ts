import {errorLogger} from "../logger/errorLogger";
import useSettingsStore from "../stores/settingsStore";
import {useUserStore} from "../stores/userStore";
import {useWebsocketStore} from "../stores/websocketStore";
import {
	type ClientUpdatePayloadV2,
	type NewProfilePicturePayload,
	PayloadSubTypeEnum,
} from "./customTypes";
import {generateUnixTimestampFnv1aHash} from "./hashGenerator";

// TODO implement hashing for profile pictures instead of sending the whole image all the time
export function handleProfileSettingsUpdatesWithSocketV2() {
	const wsReference = useWebsocketStore.getState().ws;
	if (wsReference === null) {
		errorLogger.logError(new Error("Websocket is not initialized")).catch((error) => {
			console.log(error);
		});
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

	const clientUpdatePayload: ClientUpdatePayloadV2 = {
		payloadType: PayloadSubTypeEnum.enum.profileUpdateV2,
		clientUsername: newUsername || useUserStore.getState().myUsername,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor || useUserStore.getState().myColor,
		clientProfileImage:
			newImageHash || useUserStore.getState().myProfilePhoto,
		availability: useSettingsStore.getState().availability,
	};

	wsReference.send(JSON.stringify(clientUpdatePayload));
}

function profilePictureUpdate(newImageHash: string, wsReference: WebSocket) {
	const pictureData = useSettingsStore.getState().localProfilePicture;

	const picturePayload: NewProfilePicturePayload = {
		payloadType: PayloadSubTypeEnum.enum.newProfilePicture,
		clientDbId: useUserStore.getState().myId,
		imageHash: pictureData ? newImageHash : "",
		data: pictureData ? pictureData : "",
	};

	wsReference.send(JSON.stringify(picturePayload));
}