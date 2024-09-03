import {
	MakeWindowsTaskIconFlash,
	Notification,
} from "../../../wailsjs/go/main/App";
import { WindowIsMinimised, WindowShow } from "../../../wailsjs/runtime";
import { useClientStore } from "../../stores/clientStore";
import { useDoNotDisturbStore } from "../../stores/doNotDisturbStore";
import { useGuiHasFocusStore } from "../../stores/guiHasFocusStore";
import { useRefStore } from "../../stores/refStore";
import { useUnseenMessageCountStore } from "../../stores/unseenMessageCountStore";
import { useUserStore } from "../../stores/userStore";
import { useVersionStore } from "../../stores/versionStore";
import { scrollToBottom } from "../../utils/gui/scrollToBottomNeeded";
import { base64ToUtf8 } from "../../utils/transformation/encoder";
import type {
	ClientEntity,
	ClientListPayload,
	ClientListPayloadEnhanced,
	MessagePayload,
} from "../../utils/types/customTypes";

export async function checkIfMessageIsToBeAddedToTheUnseenMessagesList(
	messagePayload: MessagePayload,
	addIdToList: boolean,
) {
	// if we don't need to scroll to the bottom, we need to add the message to the unseen messages list

	if (addIdToList) {
		useUnseenMessageCountStore
			.getState()
			.addMessageToUnseenMessagesList(
				messagePayload.messageType.messageDbId,
			);
	} else {
		useUnseenMessageCountStore.getState().resetUnseenMessageCount();
		await scrollToBottom();
	}
}

export async function checkIfNotificationIsNeeded(
	messagePayload: MessagePayload,
) {
	// no message allowed if "do not disturb" is active
	if (useDoNotDisturbStore.getState().doNotDisturb) {
		return;
	}

	// no message needed if message from this client
	if (messagePayload.clientType.clientDbId === useUserStore.getState().myId) {
		return;
	}

	// first check if gui is even in focus
	if (useGuiHasFocusStore.getState().guiHasFocus) {
		// no message needed if already at chat bottom
		if (!useRefStore.getState().chatBottomRefVisible) {
			return;
		}
	}

	const messageSenderName = useClientStore
		.getState()
		.clientMap.get(messagePayload.clientType.clientDbId)?.clientUsername;

	const titleNotification = `${messagePayload.messageType.messageTime.slice(0, 5)} - ${messageSenderName}`;

	WindowIsMinimised()
		.then((isMinimised) => {
			if (isMinimised) {
				MakeWindowsTaskIconFlash("Localchat");
			} else {
				WindowShow();
			}
		})
		.then(async () => {
			const message = base64ToUtf8(
				messagePayload.messageType.messageContext,
			);
			await Notification(titleNotification, message);
		});
}

// updates all clients and caches array of clients
// uses clientStore
export function handleClientListPayload(
	clientListPayload: ClientListPayloadEnhanced,
) {
	const newVersion = clientListPayload.version;
	useVersionStore.getState().checkForUpdate(newVersion);

	const clients = clientListPayload.clients;
	const map = new Map<string, ClientEntity>();
	for (const client of clients) {
		map.set(client.clientDbId, client);
	}
	useClientStore.getState().setClientMap(map);
}

// updates this specific client and caches its values
// uses userStore
export function updateThisClientsCachedDataWithNewPayloadData(
	payload: ClientListPayload,
) {
	const myId = useUserStore.getState().myId;
	const myNewClient = payload.clients.find(
		(client) => client.clientDbId === myId,
	);

	if (myNewClient === undefined) {
		throw new Error("Client not found in client list");
	}

	useUserStore.getState().setMyUsername(myNewClient.clientUsername);
	useUserStore.getState().setAvailability(myNewClient.availability);

	if (myNewClient.clientColor) {
		useUserStore.getState().setMyColor(myNewClient.clientColor);
	}

	if (myNewClient.clientProfilePictureHash) {
		useUserStore
			.getState()
			.setMyProfilePictureHash(myNewClient.clientProfilePictureHash);
	}

	if (myNewClient.clientProfilePictureBase64) {
		useUserStore
			.getState()
			.setMyProfilePictureBase64(myNewClient.clientProfilePictureBase64);
	}
}
