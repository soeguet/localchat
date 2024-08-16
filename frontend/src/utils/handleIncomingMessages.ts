import {Notification, PersistImage} from "../../wailsjs/go/main/App";
import {WindowMinimise, WindowShow, WindowUnminimise,} from "../../wailsjs/runtime";
import {useEmergencyNotifications} from "../components/body/emergency/useEmergencyNotifications";
import {
    handeMessageListPayload,
    handleClientListPayload,
    updateThisClientsCachedDataWithNewPayloadData,
} from "../hooks/socket/utils";
import {errorLogger} from "../logger/errorLogger";
import {useBannerStore} from "../stores/bannerStore";
import {useDoNotDisturbStore} from "../stores/doNotDisturbStore";
import {useEmergencyStore} from "../stores/emergencyStore";
import {useMessageMapStore} from "../stores/messageMapStore";
import {useProfilePictureStore} from "../stores/profilePictureStore";
import {useTypingStore} from "../stores/typingStore";
import {useUserStore} from "../stores/userStore";
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
    PayloadSubTypeEnum,
    type ProfilePictureObject,
    type ProfilePicturePayload,
} from "./customTypes";
import {preventDuplicateEmergencyMessages} from "./emergencyArrayHelper";
import {notifyClientIfReactionTarget} from "./reactionHandler";
import {retrieveProfilePicturesFromSocket} from "./socket";
import {messageHandler} from "./handlers/messageHandler";
import {clientListHandler} from "./handlers/clientListHandler";

export async function handleIncomingMessages(event: MessageEvent) {
    const dataAsObject = JSON.parse(event.data);

    // MAIN SWITCH STATEMENT
    switch (dataAsObject.payloadType) {

        // PayloadSubTypeEnum.enum.message == 1
        case PayloadSubTypeEnum.enum.message: {
            messageHandler(event);
            break;
        }

        // PayloadSubTypeEnum.enum.clientList == 2
        case PayloadSubTypeEnum.enum.clientList:
            await clientListHandler(event);
            break;

        // PayloadSubTypeEnum.enum.profileUpdate == 3
        case PayloadSubTypeEnum.enum.profileUpdate:
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

        // PayloadSubTypeEnum.enum.messageList == 4
        case PayloadSubTypeEnum.enum.messageList:
            handeMessageListPayload(event.data);
            break;

        // PayloadSubTypeEnum.enum.typing == 5
        case PayloadSubTypeEnum.enum.typing:
            if (
                dataAsObject.clientDbId === undefined ||
                dataAsObject.isTyping === undefined
            ) {
                throw new Error("Typing payload is missing client ID or typing status");
            }
            if (dataAsObject.isTyping) {
                useTypingStore.getState().addTypingClientId(dataAsObject.clientDbId);
            } else {
                useTypingStore.getState().removeTypingClientId(dataAsObject.clientDbId);
            }
            break;

        // PayloadSubTypeEnum.enum.force == 6
        case PayloadSubTypeEnum.enum.force:
            if (dataAsObject.clientDbId === useUserStore.getState().myId) {
                // just to be safe if the client does not want to get notifications!
                if (!useDoNotDisturbStore.getState().doNotDisturb) {
                    await Notification("ALARM", "PLEASE CHECK THE CHAT");

                    setTimeout(() => {
                        WindowUnminimise();
                    }, 1000);
                    WindowMinimise();
                    WindowShow();
                }
            }
            break;

        // PayloadSubTypeEnum.enum.reaction == 7
        case PayloadSubTypeEnum.enum.reaction:
            // updated message from socket with reactions
            useMessageMapStore.getState().onUpdateMessage(dataAsObject);
            notifyClientIfReactionTarget(dataAsObject as MessagePayload);
            break;

        // PayloadSubTypeEnum.enum.delete == 8
        case PayloadSubTypeEnum.enum.delete:
        // PayloadSubTypeEnum.enum.delete == 9
        case PayloadSubTypeEnum.enum.edit:
            useMessageMapStore.getState().onUpdateMessage(dataAsObject);
            break;

        // PayloadSubTypeEnum.enum.emergencyInit == 10
        case PayloadSubTypeEnum.enum.emergencyInit: {
            const payload = dataAsObject as EmergencyInitPayload;

            useEmergencyStore
                .getState()
                .setEmergencyInitiatorId(payload.initiatorClientDbId);
            useEmergencyStore.getState().setEmergency(payload.active);
            useEmergencyStore.getState().setChatVisible(true);
            useEmergencyStore.getState().setEmergencyChatId(payload.emergencyChatId);

            if (!payload.active) {
                useEmergencyStore.getState().setEmergencyMessages([]);
            }
            break;
        }

        // PayloadSubTypeEnum.enum.emergencyMessage == 11
        case PayloadSubTypeEnum.enum.emergencyMessage: {
            const payload = dataAsObject as EmergencyMessagePayload;

            if (
                useEmergencyStore.getState().emergencyChatId !== payload.emergencyChatId
            ) {
                await errorLogger.logError(
                    new Error("EMERGENCY MESSAGE FROM WRONG CHAT"),
                );
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

        // PayloadSubTypeEnum.enum.allEmergencyMessages == 12
        case PayloadSubTypeEnum.enum.allEmergencyMessages: {
            const payload: AllEmergencyMessagesPayload =
                dataAsObject as AllEmergencyMessagesPayload;

            if (
                useEmergencyStore.getState().emergencyChatId !== payload.emergencyChatId
            ) {
                await errorLogger.logError(
                    new Error("EMERGENCY MESSAGE FROM WRONG CHAT"),
                );
                return;
            }

            const currentEmergencyChatId =
                useEmergencyStore.getState().emergencyChatId;

            if (currentEmergencyChatId !== payload.emergencyChatId) {
                await errorLogger.logError(
                    new Error("EMERGENCY MESSAGE FROM WRONG CHAT"),
                );
                return;
            }

            if (payload.emergencyMessages === undefined) {
                throw new Error("Emergency messages are undefined");
            }
            const emergencyMessageArray: EmergencyMessage[] =
                payload.emergencyMessages;

            useEmergencyStore.getState().setEmergencyMessages(emergencyMessageArray);

            break;
        }

        // TODO maybe this should be skipped for .fetchProfilePicture
        // PayloadSubTypeEnum.enum.newProfilePicture == 8
        case PayloadSubTypeEnum.enum.newProfilePicture: {
            const payload = dataAsObject as NewProfilePicturePayload;

            const profilePictureObject: ProfilePictureObject = {
                clientDbId: payload.clientDbId,
                imageHash: payload.imageHash,
                data: payload.data,
            };

            useProfilePictureStore
                .getState()
                .addToProfilePictureMap(
                    profilePictureObject.clientDbId,
                    profilePictureObject,
                );

            useProfilePictureStore
                .getState()
                .removeFromNoProfilePictureAvailableMap(
                    profilePictureObject.clientDbId,
                );

            await PersistImage(profilePictureObject);
            break;
        }

        // PayloadSubTypeEnum.enum.fetchProfilePicture == 14
        case PayloadSubTypeEnum.enum.fetchProfilePicture: {
            const payload: ProfilePicturePayload =
                dataAsObject as ProfilePicturePayload;

            const profilePictureObject: ProfilePictureObject = {
                clientDbId: payload.clientDbId,
                imageHash: payload.imageHash,
                data: payload.data,
            };

            const updateMap = useProfilePictureStore.getState().profilePictureMap;
            updateMap.set(profilePictureObject.clientDbId, profilePictureObject);

            // persist in local cache - zustand
            useProfilePictureStore.getState().setProfilePictureMap(updateMap);

            // persist to goland sqlite db
            await PersistImage(profilePictureObject);

            break;
        }

        // PayloadSubTypeEnum.enum.fetchAllProfilePictures == 15
        case PayloadSubTypeEnum.enum.fetchAllProfilePictures: {
            const payload: FetchAllProfilePicturesPayload =
                dataAsObject as FetchAllProfilePicturesPayload;

            if (payload.profilePictures === undefined) {
                throw new Error("Profile pictures are undefined");
            }
            const profilePictures: ProfilePictureObject[] = payload.profilePictures;

            const newMap = new Map<ClientId, ProfilePictureObject>();

            for (let i = 0; i < profilePictures.length; i++) {
                const profilePicture: ProfilePictureObject = profilePictures[i];

                // persist to goland sqlite db
                await PersistImage(profilePicture);

                newMap.set(profilePicture.clientDbId, profilePicture);
            }

            useProfilePictureStore.getState().setProfilePictureMap(newMap);

            break;
        }

        // PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes == 20
        case PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes: {
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

        // PayloadSubTypeEnum.enum.fetchAllBanners == 18
        case PayloadSubTypeEnum.enum.fetchAllBanners: {
            const payload: BannerListPayload = dataAsObject as BannerListPayload;
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
            await errorLogger.logError(new Error("Unknown payload type"));
        // throw new Error("Unknown payload type");
    }
}