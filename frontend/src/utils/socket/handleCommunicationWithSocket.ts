import { useClientStore } from "../../stores/clientStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import { useWebsocketStore } from "../../stores/websocketStore";
import { hashBase64Image } from "../picture/pictureComparator";
import {
	type ClientUpdatePayloadV2,
	PayloadSubTypeEnum,
} from "../types/customTypes";

// TODO implement hashing for profile pictures instead of sending the whole image all the time
export async function handleProfileSettingsUpdatesWithSocketV2() {
	const wsReference = useWebsocketStore.getState().getNullSafeWebsocket();
	const imageHashForSocket = _determineNewImageHash();
	profileUpdate(imageHashForSocket, wsReference);
}

export function _determineNewImageHash() {
	const myId = useUserStore.getState().myId;
	const oldImage = useClientStore
		.getState()
		.clientMap.get(myId)?.clientProfilePictureBase64;
	const newBase64Image = useSettingsStore.getState().localProfilePicture;

	let newImageHashCandidate = "";

	if (!newBase64Image && oldImage) {
		newImageHashCandidate = oldImage;
	} else if (!newBase64Image && !oldImage) {
		return "";
	} else if (newBase64Image && !oldImage) {
		newImageHashCandidate = newBase64Image;
	} else if (newBase64Image && oldImage) {
		newImageHashCandidate = newBase64Image;
	} else {
		console.error("Invalid state for new image hash");
		throw new Error("Invalid state for new image hash");
	}

	return hashBase64Image(newImageHashCandidate);
}

function profileUpdate(newImageHash: string, wsReference: WebSocket) {
	// the socket is keeping track of the client id (cannot be changed by user), username, profile color and profile picture
	const newUsername =
		useSettingsStore.getState().localName ??
		useUserStore.getState().myUsername;
	const newColor =
		useSettingsStore.getState().localColor ??
		useUserStore.getState().myColor;
	const availability =
		useSettingsStore.getState().localAvailability ??
		useUserStore.getState().availability;
	const base64Image = useSettingsStore.getState().localProfilePicture;

	const clientUpdatePayload: ClientUpdatePayloadV2 = {
		payloadType: PayloadSubTypeEnum.enum.profileUpdateV2,
		clientUsername: newUsername,
		clientProfilePictureBase64:
			base64Image ?? useUserStore.getState().myProfilePictureBase64,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor,
		// TODO change this parameter name to something more descriptive for hashes
		clientProfilePictureHash: newImageHash,
		availability: availability,
	};

	wsReference.send(JSON.stringify(clientUpdatePayload));
}