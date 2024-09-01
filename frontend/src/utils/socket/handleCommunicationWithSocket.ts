import { useClientStore } from "../../stores/clientStore";
import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import { useWebsocketStore } from "../../stores/websocketStore";
import {
	checkIfImageChanged,
	hashBase64Image,
} from "../picture/pictureComparator";
import {
	type ClientUpdatePayloadV2,
	type NewProfilePicturePayload,
	PayloadSubTypeEnum,
} from "../types/customTypes";

// TODO implement hashing for profile pictures instead of sending the whole image all the time
export async function handleProfileSettingsUpdatesWithSocketV2() {
	const wsReference = useWebsocketStore.getState().getNullSafeWebsocket();
	const didImageChange = checkIfImageChanged();

	const imageHashForSocket = _determineNewImageHash(didImageChange);

	if (didImageChange) {
		profilePictureUpdate(imageHashForSocket, wsReference);
	}
	profileUpdate(imageHashForSocket, wsReference);
}

/**
 * Determines the new image hash.
 * @param didImageChange - Whether the image changed.
 * @returns The new image hash. String may contain old hash, new hash or empty string.
 */
export function _determineNewImageHash(didImageChange: boolean) {
	const myId = useUserStore.getState().myId;
	const clients = useClientStore.getState().clients;
	const myProfilePictureHash = clients.find(
		(client) => client.clientDbId === myId,
	)?.clientProfilePictureHash;

	if (!didImageChange) {
		if (myProfilePictureHash === undefined) {
			return "";
		}
		if (myProfilePictureHash === null) {
			return "";
		}
		return myProfilePictureHash;
	}

	const newBase64Image = useSettingsStore.getState().localProfilePicture;
	if (newBase64Image === null || newBase64Image === "") {
		return "";
	}
	return hashBase64Image(newBase64Image);
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

	const clientUpdatePayload: ClientUpdatePayloadV2 = {
		payloadType: PayloadSubTypeEnum.enum.profileUpdateV2,
		clientUsername: newUsername,
		clientDbId: useUserStore.getState().myId,
		clientColor: newColor,
		// TODO change this parameter name to something more descriptive for hashes
		clientProfilePictureHash: newImageHash,
		availability: availability,
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
