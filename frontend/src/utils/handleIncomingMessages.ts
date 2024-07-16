import { Notification, PersistImage } from "../../wailsjs/go/main/App";
import {
	WindowMinimise,
	WindowShow,
	WindowUnminimise,
} from "../../wailsjs/runtime";
import { useEmergencyNotifications } from "../components/body/emergency/useEmergencyNotifications";
import {
	checkIfMessageIsToBeAddedToTheUnseenMessagesList,
	checkIfNotificationIsNeeded,
	handeMessageListPayload,
	handleClientListPayload,
	updateThisClientsCachedDataWithNewPayloadData,
} from "../hooks/socket/utils";
import { useBannerStore } from "../stores/bannerStore";
import { useDoNotDisturbStore } from "../stores/doNotDisturbStore";
import { useEmergencyStore } from "../stores/emergencyStore";
import { useMessageMapStore } from "../stores/messageMapStore";
import { useProfilePictureStore } from "../stores/profilePictureStore";
import { useTypingStore } from "../stores/typingStore";
import { useUserStore } from "../stores/userStore";
import {
	type AllEmergencyMessagesPayload,
	type AllProfilePictureHashesPayload,
	type BannerListPayload,
	type BannerObject,
	type ClientId,
	type EmergencyInitPayload,
	type EmergencyMessage,
	type EmergencyMessagePayload,
	type FetchAllProfilePicturesPayload,
	type Hash,
	type MessagePayload,
	type NewProfilePicturePayload,
	PayloadSubType,
	type ProfilePictureObject,
	type ProfilePicturePayload,
} from "./customTypes";
import { preventDuplicateEmergencyMessages } from "./emergencyArrayHelper";
import { notifyClientIfReactionTarget } from "./reactionHandler";
import { checkIfScrollToBottomIsNeeded } from "./scrollToBottomNeeded";
import { retrieveProfilePicturesFromSocket } from "./socket";

export async function handleIncomingMessages(event: MessageEvent) {
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
		case PayloadSubType.clientList:
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

			// await initializeProfilePictures();

			// TODO this seems fishy, need to ask somewhere else for all messages

			// AFTER receiving the client list, ask for the message list
			// retrieveMessageListFromSocket();
			break;

		// PayloadSubType.profileUpdate == 3
		case PayloadSubType.profileUpdate:
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

			if (!payload.active) {
				useEmergencyStore.getState().setEmergencyMessages([]);
			}
			break;
		}

		// PayloadSubType.emergencyMessage == 11
		case PayloadSubType.emergencyMessage: {
			const payload = dataAsObject as EmergencyMessagePayload;

			if (
				useEmergencyStore.getState().emergencyChatId !==
				payload.emergencyChatId
			) {
				console.error("EMERGENCY MESSAGE FROM WRONG CHAT", payload);
				return;
			}

			const emergencyMessageArray: EmergencyMessage[] =
				useEmergencyStore.getState().emergencyMessages;

			const result = await preventDuplicateEmergencyMessages(
				emergencyMessageArray,
				payload,
			);

			if (result === 1) {
				return;
			}

			const emergencyMessage: EmergencyMessage = {
				emergencyChatId: payload.emergencyChatId,
				messageDbId: payload.messageDbId,
				message: payload.message,
				time: payload.time,
				clientDbId: payload.clientDbId,
			};
			const newArray = [...emergencyMessageArray, emergencyMessage];
			useEmergencyStore.getState().setEmergencyMessages(newArray);

			useEmergencyNotifications();

			break;
		}

		// PayloadSubType.allEmergencyMessages == 12
		case PayloadSubType.allEmergencyMessages: {
			const payload: AllEmergencyMessagesPayload =
				dataAsObject as AllEmergencyMessagesPayload;

			if (
				useEmergencyStore.getState().emergencyChatId !==
				payload.emergencyChatId
			) {
				console.error("EMERGENCY MESSAGE FROM WRONG CHAT", payload);
				return;
			}

			const currentEmergencyChatId =
				useEmergencyStore.getState().emergencyChatId;

			if (currentEmergencyChatId !== payload.emergencyChatId) {
				console.error("EMERGENCY MESSAGE FROM WRONG CHAT", payload);
				return;
			}

			const emergencyMessageArray: EmergencyMessage[] =
				payload.emergencyMessages;

			useEmergencyStore
				.getState()
				.setEmergencyMessages(emergencyMessageArray);

			break;
		}

		// PayloadSubType.newProfilePicture == 8
		case PayloadSubType.newProfilePicture: {
			const payload = dataAsObject as NewProfilePicturePayload;

			const profilePictureObject: ProfilePictureObject = {
				clientDbId: payload.clientDbId,
				imageHash: payload.imageHash,
				data: payload.data,
			};

			const updateMap =
				useProfilePictureStore.getState().profilePictureMap;
			updateMap.set(
				profilePictureObject.clientDbId,
				profilePictureObject,
			);

			useProfilePictureStore.getState().setProfilePictureMap(updateMap);

			await PersistImage(profilePictureObject);
			break;
		}

		// PayloadSubType.fetchProfilePicture == 14
		case PayloadSubType.fetchProfilePicture: {
			const payload: ProfilePicturePayload =
				dataAsObject as ProfilePicturePayload;

			const profilePictureObject: ProfilePictureObject = {
				clientDbId: payload.clientDbId,
				imageHash: payload.imageHash,
				data: payload.data,
			};

			const updateMap =
				useProfilePictureStore.getState().profilePictureMap;
			updateMap.set(
				profilePictureObject.clientDbId,
				profilePictureObject,
			);

			// persist in local cache - zustand
			useProfilePictureStore.getState().setProfilePictureMap(updateMap);

			// persist to goland sqlite db
			await PersistImage(profilePictureObject);

			break;
		}

		// PayloadSubType.fetchAllProfilePictures == 15
		case PayloadSubType.fetchAllProfilePictures: {
			const payload: FetchAllProfilePicturesPayload =
				dataAsObject as FetchAllProfilePicturesPayload;
			const profilePictures: ProfilePictureObject[] =
				payload.profilePictures;

			const newMap = new Map<ClientId, ProfilePictureObject>();

			for (let i = 0; i < profilePictures.length; i++) {
				const profilePicture: ProfilePictureObject = profilePictures[i];

				// persist to goland sqlite db
				PersistImage(profilePicture);

				newMap.set(profilePicture.clientDbId, profilePicture);
			}

			useProfilePictureStore.getState().setProfilePictureMap(newMap);
			break;
		}

		// PayloadSubType.fetchAllProfilePictureHashes == 20
		case PayloadSubType.fetchAllProfilePictureHashes: {
			debugger;
			const payload: AllProfilePictureHashesPayload =
				dataAsObject as AllProfilePictureHashesPayload;

			if (payload.profilePictureHashes === undefined) {
				throw new Error("Profile picture hashes are undefined");
			}

			const profilePictureMap =
				useProfilePictureStore.getState().profilePictureMap;

			for (const profilePictureHash of payload.profilePictureHashes) {
				const hash: Hash = profilePictureHash.imageHash;
				const clientDbId: ClientId = profilePictureHash.clientDbId;

				if (!profilePictureMap.has(clientDbId)) {
					// ask for the profile picture
					retrieveProfilePicturesFromSocket(clientDbId);
				} else {
					// check if hash from payload matches hash in map
					const profilePicture = profilePictureMap.get(clientDbId);
					if (profilePicture && profilePicture.imageHash !== hash) {
						// ask for the new profile picture
						retrieveProfilePicturesFromSocket(clientDbId);
					}
				}
			}
			break;
		}

		// PayloadSubType.fetchAllBanners == 18
		case PayloadSubType.fetchAllBanners: {
			const payload: BannerListPayload =
				dataAsObject as BannerListPayload;
			if (payload.banners === undefined) {
				throw new Error("Banners are undefined");
			}
			const banners: BannerObject[] = payload.banners;
			// TODO maybe check for updating the banners
			useBannerStore.getState().setBanners(banners);
			break;
		}

		// unknown payload type
		default:
			console.error("Unknown payload type", dataAsObject);
			throw new Error("Unknown payload type");
	}
}
