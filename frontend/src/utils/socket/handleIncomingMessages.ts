import { errorLogger } from "../../logger/errorLogger";
import { allEmergencyMessagesHandler } from "../handlers/allEmergencyMessagesHandler";
import { clientListHandler } from "../handlers/clientListHandler";
import { emergencyInitHandler } from "../handlers/emergencyInitHandler";
import { emergencyMessageHandler } from "../handlers/emergencyMessageHandler";
import { fetchAllBannersHandler } from "../handlers/fetchAllBannersHandler";
import { forceHandler } from "../handlers/forceHandler";
import { messageHandler } from "../handlers/messageHandler";
import { messageListHandler } from "../handlers/messageListHandler";
import { modifyMessageHandler } from "../handlers/modifyMessageHandler";
import { reactionHandler } from "../handlers/reactionHandler";
import { typingHandler } from "../handlers/typingHandler";
import { PayloadSubTypeEnum } from "../types/customTypes";

export async function handleIncomingMessages(event: MessageEvent) {
	const dataAsObject = JSON.parse(event.data);

	// MAIN SWITCH STATEMENT
	switch (dataAsObject.payloadType) {
		// PayloadSubTypeEnum.enum.message == 1
		case PayloadSubTypeEnum.enum.message: {
			await messageHandler(event);
			break;
		}

		// PayloadSubTypeEnum.enum.clientList == 2
		case PayloadSubTypeEnum.enum.clientList:
			await clientListHandler(event);
			break;

		// PayloadSubTypeEnum.enum.profileUpdate == 3
		case PayloadSubTypeEnum.enum.profileUpdate:
			throw new Error("Profile update !old! is not implemented");
		// // TODO check if this is needed
		// profileUpdateHandler(event);
		// break;

		// PayloadSubTypeEnum.enum.messageList == 4
		case PayloadSubTypeEnum.enum.messageList:
			messageListHandler(event);
			break;

		// PayloadSubTypeEnum.enum.typing == 5
		case PayloadSubTypeEnum.enum.typing:
			typingHandler(event);
			break;

		// PayloadSubTypeEnum.enum.force == 6
		case PayloadSubTypeEnum.enum.force:
			await forceHandler(event);
			break;

		// PayloadSubTypeEnum.enum.reaction == 7
		case PayloadSubTypeEnum.enum.reaction:
			// updated message from socket with reactions
			await reactionHandler(event);
			break;

		// PayloadSubTypeEnum.enum.delete == 8
		case PayloadSubTypeEnum.enum.delete:
		// PayloadSubTypeEnum.enum.delete == 9
		case PayloadSubTypeEnum.enum.edit:
			modifyMessageHandler(event);
			break;

		// PayloadSubTypeEnum.enum.emergencyInit == 10
		case PayloadSubTypeEnum.enum.emergencyInit: {
			emergencyInitHandler(event);
			break;
		}

		// PayloadSubTypeEnum.enum.emergencyMessage == 11
		case PayloadSubTypeEnum.enum.emergencyMessage: {
			await emergencyMessageHandler(event);
			break;
		}

		// PayloadSubTypeEnum.enum.allEmergencyMessages == 12
		case PayloadSubTypeEnum.enum.allEmergencyMessages: {
			allEmergencyMessagesHandler(event);
			break;
		}

		// TODO maybe this should be skipped for .fetchProfilePicture
		// PayloadSubTypeEnum.enum.newProfilePicture == 8
		case PayloadSubTypeEnum.enum.newProfilePicture: {
			throw new Error("Not implemented - newProfilePictureHandler 8");
			// await newProfilePictureHandler(event);
			// break;
		}

		// PayloadSubTypeEnum.enum.fetchProfilePicture == 14
		case PayloadSubTypeEnum.enum.fetchProfilePicture: {
			throw new Error("Not implemented - fetchProfilePictureHandler 14");
			// await fetchProfilePictureHandler(event);
			// break;
		}

		// PayloadSubTypeEnum.enum.fetchAllProfilePictures == 15
		case PayloadSubTypeEnum.enum.fetchAllProfilePictures: {
			throw new Error(
				"Not implemented - fetchAllProfilePicturesHandler 15",
			);
			// await fetchAllProfilePicturesHandler(event);
			// break;
		}

		// PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes == 20
		case PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes: {
			throw new Error(
				"Not implemented - fetchAllProfilePictureHashesHandler 20",
			);
			// fetchAllProfilePictureHashesHandler(event);
			// break;
		}

		// PayloadSubTypeEnum.enum.fetchAllBanners == 18
		case PayloadSubTypeEnum.enum.fetchAllBanners: {
			fetchAllBannersHandler(event);
			break;
		}

		// unknown payload type
		default:
			console.error("Unknown payload type");
			errorLogger.logError(new Error("Unknown payload type"));
		// throw new Error("Unknown payload type");
	}
}