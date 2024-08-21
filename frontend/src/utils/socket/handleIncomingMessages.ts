import {errorLogger} from "../../logger/errorLogger";
import {
    PayloadSubTypeEnum,
} from "../types/customTypes";
import {messageHandler} from "../handlers/messageHandler";
import {clientListHandler} from "../handlers/clientListHandler";
import {profileUpdateHandler} from "../handlers/profileUpdateHandler";
import {messageListHandler} from "../handlers/messageListHandler";
import {typingHandler} from "../handlers/typingHandler";
import {forceHandler} from "../handlers/forceHandler";
import {reactionHandler} from "../handlers/reactionHandler";
import {modifyMessageHandler} from "../handlers/modifyMessageHandler";
import {emergencyInitHandler} from "../handlers/emergencyInitHandler";
import {emergencyMessageHandler} from "../handlers/emergencyMessageHandler";
import {allEmergencyMessagesHandler} from "../handlers/allEmergencyMessagesHandler";
import {newProfilePictureHandler} from "../handlers/newProfilePictureHandler";
import {fetchProfilePictureHandler} from "../handlers/fetchProfilePictureHandler";
import {fetchAllProfilePicturesHandler} from "../handlers/fetchAllProfilePicturesHandler";
import {fetchAllProfilePictureHashesHandler} from "../handlers/fetchAllProfilePictureHashesHandler";
import {fetchAllBannersHandler} from "../handlers/fetchAllBannersHandler";

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
            // TODO check if this is needed
            profileUpdateHandler(event);
            break;

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
            await newProfilePictureHandler(event);
            break;
        }

        // PayloadSubTypeEnum.enum.fetchProfilePicture == 14
        case PayloadSubTypeEnum.enum.fetchProfilePicture: {
            await fetchProfilePictureHandler(event);
            break;
        }

        // PayloadSubTypeEnum.enum.fetchAllProfilePictures == 15
        case PayloadSubTypeEnum.enum.fetchAllProfilePictures: {
            await fetchAllProfilePicturesHandler(event);
            break;
        }

        // PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes == 20
        case PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes: {
            fetchAllProfilePictureHashesHandler(event);
            break;
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