import {
	MakeWindowsTaskIconFlash,
	Notification,
} from "../../../../wailsjs/go/main/App.js";
import {
	WindowIsMinimised,
	WindowShow,
} from "../../../../wailsjs/runtime/runtime.js";
import { useClientStore } from "../../../stores/clientStore.js";
import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useGuiHasFocusStore } from "../../../stores/guiHasFocusStore.js";
import { useUserStore } from "../../../stores/userStore";
import { base64ToUtf8 } from "../../../utils/encoder.js";

const useEmergencyNotifications = () => {
	// no need for notifications, if chat is in focus and chat is open
	const chatInFocus = useGuiHasFocusStore.getState().guiHasFocus;
	const emergencyChatOpen = useEmergencyStore.getState().chatVisible;
	if (chatInFocus && emergencyChatOpen) {
		return;
	}

	const emergencyMessages = useEmergencyStore.getState().emergencyMessages;
	const lastMessage = emergencyMessages[emergencyMessages.length - 1];
	const lastMessageClientId = lastMessage.clientDbId;
	const availability = useUserStore.getState().availability;
	const thisClientId = useUserStore.getState().myId;
	const thisClientName = useClientStore
		.getState()
		.clients.find(
			(client) => client.clientDbId === thisClientId,
		)?.clientUsername;
	const decodedMessage = base64ToUtf8(lastMessage.message);
	const messageSenderUsername = useClientStore
		.getState()
		.clients.find(
			(client) => client.clientDbId === lastMessageClientId,
		)?.clientUsername;

	if (!availability) {
		return;
	}

	if (thisClientId === lastMessageClientId) {
		return;
	}

	useEmergencyStore.getState().setChatVisible(true);

	// WindowShow();
	//
	// Notification(
	// 	`${thisClientName}: emergency chat - ${messageSenderUsername}`,
	// 	decodedMessage,
	// );
	// MakeWindowsTaskIconFlash("Localchat");
	WindowIsMinimised()
		.then((isMinimised) => {
			if (isMinimised) {
				MakeWindowsTaskIconFlash("Localchat");
			} else {
				WindowShow();
			}
		})
		.then(async () => {
			await Notification(
				`${thisClientName}: emergency chat - ${messageSenderUsername}`,
				decodedMessage,
			);
		});
};

export { useEmergencyNotifications };
