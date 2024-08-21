import useSettingsStore from "../../stores/settingsStore";
import {useUserStore} from "../../stores/userStore";
import {useWebsocketStore} from "../../stores/websocketStore";
import {type ClientUpdatePayloadV2, type NewProfilePicturePayload, PayloadSubTypeEnum,} from "../types/customTypes";
import {useProfilePictureStore} from "../../stores/profilePictureStore";
import {checkIfImageChanged, hashBase64Image} from "../picture/pictureComparator";
import {errorLogger} from "../../logger/errorLogger";

// TODO implement hashing for profile pictures instead of sending the whole image all the time
export async function handleProfileSettingsUpdatesWithSocketV2() {
	// grab the websocket
	const wsReference = useWebsocketStore.getState().ws;
	if (wsReference === null) {
		console.error("Websocket is not initialized");
		throw new Error("Websocket is not initialized");
	}

	debugger
	// check if image changed
	const didImageChange = await checkIfImageChanged();

	let imageHashForSocket = useProfilePictureStore.getState().thisClientProfilePictureHash
	if (didImageChange) {
		const newBase64Image = useSettingsStore.getState().localProfilePicture;
		imageHashForSocket = await hashBase64Image(newBase64Image);
		profilePictureUpdate(imageHashForSocket, wsReference);
	}

	if (imageHashForSocket === null) {
		errorLogger.logError(new Error("Image hash for profile picture is null"));
		throw new Error("Image hash for profile picture is null");
	}

	profileUpdate(imageHashForSocket, wsReference);
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
		// TODO change this to hash
		clientProfileImage: newImageHash,
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