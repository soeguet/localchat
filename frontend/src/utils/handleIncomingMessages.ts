import { Notification } from "../../wailsjs/go/main/App";
import {
	WindowMinimise,
	WindowShow,
	WindowUnminimise,
} from "../../wailsjs/runtime";
import {
	checkIfMessageIsToBeAddedToTheUnseenMessagesList,
	checkIfNotificationIsNeeded,
	handeMessageListPayload,
	handleClientListPayload,
	updateThisClientsCachedDataWithNewPayloadData,
} from "../hooks/socket/utils";
import { useDoNotDisturbStore } from "../stores/doNotDisturbStore";
import { useEmergencyStore } from "../stores/emergencyStore";
import { useMessageMapStore } from "../stores/messageMapStore";
import { useTypingStore } from "../stores/typingStore";
import { useUserStore } from "../stores/userStore";
import {
	type MessagePayload,
	PayloadSubType,
	type EmergencyInitPayload,
	EmergencyMessagePayload,
	EmergencyMessage,
} from "./customTypes";
import { notifyClientIfReactionTarget } from "./reactionHandler";
import { checkIfScrollToBottomIsNeeded } from "./scrollToBottomNeeded";
import { retrieveMessageListFromSocket } from "./socket";

export function handleIncomingMessages(event: MessageEvent) {
	const dataAsObject = JSON.parse(event.data);

	// MAIN SWITCH STATEMENT
	switch (dataAsObject.payloadType) {
		// normal chat messages
		// PayloadSubType.message == 1
		case PayloadSubType.message: {
			const messagePayload = JSON.parse(event.data) as MessagePayload;

			useMessageMapStore.getState().onMessage(messagePayload);

			// if scroll to bottom is not needed, add the message to the unseen messages list
			const addIdToList = !checkIfScrollToBottomIsNeeded(
				messagePayload.clientType.clientDbId,
			);
			checkIfMessageIsToBeAddedToTheUnseenMessagesList(
				messagePayload,
				addIdToList,
			);

			//display the message
			checkIfNotificationIsNeeded(messagePayload);
			break;
		}

		// update the client list with new data
		// PayloadSubType.clientList == 2
		// PayloadSubType.profileUpdate == 3
		case PayloadSubType.clientList || PayloadSubType.profileUpdate:
			// console.table(dataAsObject.clients);
			if (
				dataAsObject.clients === undefined ||
				dataAsObject.clients === null ||
				dataAsObject.clients.length === 0
			) {
				throw new Error("Client list is empty");
			}
			handleClientListPayload(event.data);
			updateThisClientsCachedDataWithNewPayloadData(event.data);

			// AFTER receiving the client list, ask for the message list
			retrieveMessageListFromSocket();

			break;

		// PayloadSubType.messageList == 4
		case PayloadSubType.messageList:
			handeMessageListPayload(event.data);
			break;

		// PayloadSubType.typing == 5
		case PayloadSubType.typing:
			if (
				dataAsObject.clientDbId === undefined ||
				dataAsObject.isTyping === undefined
			) {
				throw new Error(
					"Typing payload is missing client ID or typing status",
				);
			}
			if (dataAsObject.isTyping) {
				useTypingStore
					.getState()
					.addTypingClientId(dataAsObject.clientDbId);
			} else {
				useTypingStore
					.getState()
					.removeTypingClientId(dataAsObject.clientDbId);
			}
			break;

		// PayloadSubType.force == 6
		case PayloadSubType.force:
			if (dataAsObject.clientDbId === useUserStore.getState().myId) {
				// just to be safe if the client does not want to get notifications!
				if (!useDoNotDisturbStore.getState().doNotDisturb) {
					Notification("ALARM", "PLEASE CHECK THE CHAT");

					setTimeout(() => {
						WindowUnminimise();
					}, 1000);
					WindowMinimise();
					WindowShow();
				}
			}
			break;

		// PayloadSubType.reaction == 7
		case PayloadSubType.reaction:
			// updated message from socket with reactions
			useMessageMapStore.getState().onUpdateMessage(dataAsObject);
			notifyClientIfReactionTarget(dataAsObject as MessagePayload);
			break;

		// PayloadSubType.delete == 8
		case PayloadSubType.delete:
		// PayloadSubType.delete == 9
		case PayloadSubType.edit:
			useMessageMapStore.getState().onUpdateMessage(dataAsObject);
			break;

		// PayloadSubType.emergencyInit == 10
		case PayloadSubType.emergencyInit: {
			const payload = dataAsObject as EmergencyInitPayload;

			useEmergencyStore
				.getState()
				.setEmergencyInitiatorId(payload.initiatorClientDbId);
			useEmergencyStore.getState().setEmergency(payload.active);
			useEmergencyStore.getState().setChatVisible(true);
			useEmergencyStore
				.getState()
				.setEmergencyChatId(payload.emergencyChatId);
			break;
		}

		case PayloadSubType.emergencyMessage: {
			const payload = dataAsObject as EmergencyMessagePayload;
			console.log("EMERGENCY MESSAGE", payload);

			if (
				useEmergencyStore.getState().emergencyChatId !==
				payload.emergencyChatId
			) {
				console.error("EMERGENCY MESSAGE FROM WRONG CHAT", payload);
				return;
			}

			const emergencyMessageArray: EmergencyMessage[] =
				useEmergencyStore.getState().emergencyMessages;

			// prevent duplicate messages
			for (let i = 0; i < emergencyMessageArray.length; i++) {
				if (
					emergencyMessageArray[i].messageDbId === payload.messageDbId
				) {
					console.error("DUPLICATE EMERGENCY MESSAGE", payload);
					return;
				}
			}

			const emergencyMessage: EmergencyMessage = {
				emergencyChatId: payload.emergencyChatId,
				messageDbId: payload.messageDbId,
				message: payload.message,
				time: payload.time,
				clientDbId: payload.clientDbId,
			};
			emergencyMessageArray.push(emergencyMessage);
			useEmergencyStore
				.getState()
				.setEmergencyMessage(emergencyMessageArray);
			break;
		}
		// unknown payload type
		default:
			console.error("Unknown payload type", dataAsObject);
			throw new Error("Unknown payload type");
	}
}
