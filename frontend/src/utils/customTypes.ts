export enum PayloadSubType {
	auth = 0,
	message = 1,
	clientList = 2,
	profileUpdate = 3,
	messageList = 4,
	typing = 5,
	force = 6,
	reaction = 7,
	delete = 8,
	edit = 9,
	emergencyInit = 10,
	emergencyMessage = 11,
	allEmergencyMessages = 12,
	newProfilePicture = 13,
	fetchProfilePicture = 14,
	fetchAllProfilePictures = 15,
	fetchCurrentClientProfilePictureHash = 16,
	fetchAllProfilePictureHashes = 20,
	profileUpdateV2 = 17,
	fetchAllBanners = 18,
	modifyBanner = 19,
}

export type ProfilePicture = string;
export type ProfilePictureHash = string;
export type ClientId = string;
export type Hash = string;

export type ProfilePicturesHashes = {
	clientDbId: ClientId;
	imageHash: Hash;
};
export type AllProfilePictureHashesPayload = {
	payloadType: PayloadSubType.fetchAllProfilePictureHashes;
	profilePictureHashes?: ProfilePicturesHashes[];
};

export type Priority = 1 | 2 | 3 | 4 | 5;

export type BannerObject = {
	id: Hash;
	title: string;
	message: string;
	priority: Priority;
	hidden: boolean;
};

export type BannerAction = "add" | "remove" | "update";

export type BannerPayload = {
	payloadType: PayloadSubType.modifyBanner;
	banner: BannerObject;
	action: BannerAction;
};

export type BannerListPayload = {
	payloadType: PayloadSubType.fetchAllBanners;
	banners?: BannerObject[];
};

export type ProfilePictureObject = {
	clientDbId: ClientId;
	imageHash: ProfilePictureHash;
	data: ProfilePicture;
};

export type NewProfilePicturePayload = ProfilePictureObject & {
	payloadType: PayloadSubType.newProfilePicture;
};

export type ProfilePicturePayload = {
	payloadType: PayloadSubType.fetchProfilePicture;
	profilePictureDbId: number;
	clientDbId: string;
	imageHash: string;
	data: string;
};

export type FetchAllProfilePicturesPayload = {
	payloadType: PayloadSubType.fetchAllProfilePictures;
	profilePictures: ProfilePictureObject[];
};

export type EmergencyInitPayload = {
	payloadType: PayloadSubType.emergencyInit;
	active: boolean;
	emergencyChatId: string;
	initiatorClientDbId: ClientId;
};

export type EmergencyMessagePayload = {
	payloadType: PayloadSubType.emergencyMessage;
	emergencyChatId: string;
	clientDbId: ClientId;
	messageDbId: string;
	time: string;
	message: string;
};

export type AllEmergencyMessagesPayload = {
	payloadType: PayloadSubType.allEmergencyMessages;
	emergencyMessages: EmergencyMessage[];
	emergencyChatId: string;
};

export type EmergencyMessage = Omit<EmergencyMessagePayload, "payloadType">;

export type VersionEntity = {
	major: number;
	minor: number;
	patch: number;
}

export type AuthenticationPayload = {
	payloadType: PayloadSubType.auth;
	version: VersionEntity;
} & Pick<ClientEntity, "clientDbId" | "clientUsername">;

export type ImageEntity = {
	imageDbId: string;
	type: string;
	data: string;
};

export type ClientUpdatePayloadV2 = {
	payloadType: PayloadSubType.profileUpdateV2;
} & ClientEntity;

export type ClientListPayload = {
	payloadType: PayloadSubType.clientList;
	clients: ClientEntity[];
};

export type ClientEntity = {
	clientDbId: ClientId;
	clientUsername: string;
	clientColor?: string;
	// TODO rename this property to clientProfileImageHash
	clientProfileImage?: string;
	availability: boolean;
};

export type MessageEntity = {
	deleted: false;
	edited: false;
	messageDbId: string;
	messageContext: string;
	messageTime: string;
	messageDate: string;
};

export type QuoteEntity = {
	quoteDbId: string;
	quoteClientId: string;
	quoteMessageContext: string;
	quoteTime: string;
	quoteDate: string;
};

export type ReactionEntity = {
	reactionDbId: number;
	reactionMessageId: string;
	reactionContext: string;
	reactionClientId: string;
};

export type MessagePayload = {
	payloadType: PayloadSubType.message;
	messageType: MessageEntity;
	clientType: Pick<ClientEntity, "clientDbId">;
	quoteType?: QuoteEntity;
	reactionType?: Omit<ReactionEntity, "reactionDbId">[];
	imageType?: ImageEntity;
};