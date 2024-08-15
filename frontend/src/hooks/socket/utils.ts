import {
	MakeWindowsTaskIconFlash,
	Notification,
} from "../../../wailsjs/go/main/App";
import { WindowIsMinimised, WindowShow } from "../../../wailsjs/runtime";
import { useRefStore } from "../../stores/refStore";
import { useDoNotDisturbStore } from "../../stores/doNotDisturbStore";
import { useUnseenMessageCountStore } from "../../stores/unseenMessageCountStore";
import { useUserStore } from "../../stores/userStore";
import type {
	ClientEntity,
	ClientListPayload, ClientListPayloadEnhanced,
	MessagePayload,
	PayloadSubType,
} from "../../utils/customTypes";
import { useMessageMapStore } from "../../stores/messageMapStore";
import { useClientStore } from "../../stores/clientStore";
import { useGuiHasFocusStore } from "../../stores/guiHasFocusStore";
import { scrollToBottom } from "../../utils/functionality";
import { base64ToUtf8 } from "../../utils/encoder";
import {useVersionStore} from "../../stores/versionStore";

export function checkIfMessageIsToBeAddedToTheUnseenMessagesList(
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
		scrollToBottom();
	}
}

export function checkIfNotificationIsNeeded(messagePayload: MessagePayload) {
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
		.clients.find(
			(predicate) =>
				predicate.clientDbId === messagePayload.clientType.clientDbId,
		)?.clientUsername;

	const titleNotification = `${messagePayload.messageType.messageTime.slice(0, 5)} - ${messageSenderName}`;

	// WindowShow();
	// MakeWindowsTaskIconFlash("localchat");
	WindowIsMinimised()
		.then((isMinimised) => {
			if (isMinimised) {
				MakeWindowsTaskIconFlash("Localchat");
				// setTimeout(() => {
				//     WindowUnminimise();
				// }, 100);
				// setTimeout(() => {
				//     WindowHide();
				// }, 600);
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

	// WindowIsMinimised().then((isMinimised) => {
	//     if (isMinimised) {
	//         MakeWindowsTaskIconFlash("localchat");
	//     } else {
	//         WindowShow();
	//     }
	// });
}

// updates all clients and caches array of clients
// uses clientStore
export function handleClientListPayload(payloadAsString: string) {
	const payloadAsObject: ClientListPayloadEnhanced = JSON.parse(payloadAsString);

	// update info about the newest client version
	useVersionStore.getState().checkForUpdate(payloadAsObject.version);

	const clients: ClientEntity[] = payloadAsObject.clients;
	useClientStore.getState().setClients(clients);
}

// updates this specific client and caches its values
// uses userStore
export function updateThisClientsCachedDataWithNewPayloadData(
	payloadAsString: string,
) {
	const payloadAsObject: ClientListPayload = JSON.parse(payloadAsString);
	const clients: ClientEntity[] = payloadAsObject.clients;
	const myId = useUserStore.getState().myId;
	const myClient = clients.find((client) => client.clientDbId === myId);

	if (myClient === undefined) {
		throw new Error("Client not found in client list");
	}

	useUserStore.getState().setMyUsername(myClient.clientUsername);
	useUserStore.getState().setAvailability(myClient.availability);

	if (myClient.clientColor) {
		useUserStore.getState().setMyColor(myClient.clientColor);
	}

	if (myClient.clientProfileImage) {
		useUserStore.getState().setMyProfilePhoto(myClient.clientProfileImage);
	}
}

export function handeMessageListPayload(data: string) {
	const messageListPayload = JSON.parse(data) as {
		payloadType: PayloadSubType.messageList;
		messageList: MessagePayload[];
	};

	if (
		messageListPayload.messageList === undefined ||
		messageListPayload.messageList === null
	) {
		throw new Error("messageListPayload.payload is empty");
	}

	// biome-ignore lint/complexity/noForEach: <explanation>
	messageListPayload.messageList.forEach((messagePayload) => {
		useMessageMapStore.getState().onMessage(messagePayload);
	});
}