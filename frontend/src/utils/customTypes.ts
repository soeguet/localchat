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
	profileUpdateV2 = 17,
	fetchAllBanners = 18,
	modifyBanner = 19,
}

export type ProfilePicture = string;
export type ProfilePictureHash = string;
export type ClientId = string;
export type Hash = string;

export type Priority = 1 | 2 | 3 | 4 | 5;

export type BannerObject = {
	id: Hash;
	title: string;
	message: string;
	priority: Priority;
	hidden: boolean;
};

export type ProfilePictureObject = {
	clientDbId: ClientId;
	imageHash: ProfilePictureHash;
	data: ProfilePicture;
};

export type NewProfilePicturePayload = ProfilePictureObject & {
	payloadType: PayloadSubType.newProfilePicture;
};

export type FetchProfilePicturePayload = {
	payloadType: PayloadSubType.fetchProfilePicture;
	clientDbId: ClientId;
};

export type ProfilePicturePayload = {
	payloadType: PayloadSubType.fetchProfilePicture;
	profilePictureDbId: number;
	clientDbId: string;
	imageHash: string;
	data: string;
};

export type FetchCurrentClientProfilePictureHashPayload = {
	payloadType: PayloadSubType.fetchCurrentClientProfilePictureHash;
	clientDbId: ClientId;
	clientProfilePictureHash: Hash;
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

/**
 * [[ RESULTING TYPE ]]
 * export type EmergencyMessagePayload = {
 *	  emergencyChatId: string;
 *	  clientDbId: ClientId;
 *	  messageDbId: string;
 *	  time: string;
 *	  message: string;
 * };
 */
export type EmergencyMessage = Omit<EmergencyMessagePayload, "payloadType">;

/**
 * [[ RESULTING TYPE ]]
 *  export type AuthenticationPayload = {
 *     payloadType: PayloadSubType.auth;
 *     clientUsername: string;
 *     clientDbId: ClientId;
 *  };
 */
export type AuthenticationPayload = {
	payloadType: PayloadSubType.auth;
} & Pick<ClientEntity, "clientDbId" | "clientUsername">;

export type ImageEntity = {
	imageDbId: string;
	type: string;
	data: string;
};

/**
 * [[ RESULTING TYPE ]]
 *  export type ClientUpdatePayload = {
 *     payloadType: PayloadSubType.auth;
 *     clientDbId: ClientId;
 *     clientUsername: string;
 *     clientColor?: string;
 *     clientProfileImage?: string;
 *     availability: boolean;
 *  };
 */
export type ClientUpdatePayload = {
	payloadType: PayloadSubType.profileUpdate;
} & ClientEntity;

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

/**
 * [[ RESULTING TYPE ]]
 * export type QuoteEntity = {
 *    quoteDbId: number;
 *    quoteMessageId: string;
 *    quoteClientId: string;
 *    quoteMessageContext: string;
 *    quoteTime: string;
 *    quoteDate: string;
 *  };
 *
 * @param {string} quoteDbId
 * @param {string} quoteClientId
 * @param {string} quoteMessageContext
 * @param {string} quoteTime
 * @param {string} quoteDate
 */
export type QuoteEntity = {
	quoteDbId: string;
	quoteClientId: string;
	quoteMessageContext: string;
	quoteTime: string;
	quoteDate: string;
};

/**
 * [[ RESULTING TYPE ]]
 *  export type ReactionEntity = {
 *     payloadType: PayloadSubType.reaction;
 *     reactionMessageId: string;
 *     reactionContext: string;
 *     reactionClientId: string;
 *  };
 */
export type ReactionPayload = Omit<ReactionEntity, "reactionDbId"> & {
	payloadType: PayloadSubType.reaction;
};

export type ReactionEntity = {
	reactionDbId: number;
	reactionMessageId: string;
	reactionContext: string;
	reactionClientId: string;
};

/**
 * [[ RESULTING TYPE ]]
 * export type MessagePayload = {
 *      payloadType: PayloadSubType.message;
 *      messageType: {
 *          messageDbId: string;
 *          messageContext: string;
 *          messageTime: string;
 *          messageDate: Date;
 *      };
 *      clientType: {
 *          clientDbId: ClientId;
 *      };
 *      quoteType?: {
 *          quoteMessageId: string;
 *          quoteClientId: string;
 *          quoteMessageContext: string;
 *          quoteTime: string;
 *          quoteDate: Date;
 *      };
 *      reactionType?: {
 *          reactionMessageId: string;
 *          reactionContext: string;
 *          reactionClientId: string;
 *      }[];
 *      imageType?: {
 *      	imageDbId: string;
 *      	type: string;
 *      	data: string;
 *      };
 *    };
 */
export type MessagePayload = {
	payloadType: PayloadSubType.message;
	messageType: MessageEntity;
	clientType: Pick<ClientEntity, "clientDbId">;
	quoteType?: QuoteEntity;
	reactionType?: Omit<ReactionEntity, "reactionDbId">[];
	imageType?: ImageEntity;
};

export type MessageListPayload = {
	payloadType: PayloadSubType.messageList;
	messageList: Omit<MessagePayload, "payloadType">[];
};

// /**custom
//  * Represents a message sent back to clients.
//  */
// export type MessageBackToClients = {
//     id: string;
//     sender: string;
//     message: string;
// };
//
// export type UserDatabaseRow = {
//     id: string;
//     user: RegisteredUser;
// };
//
// export type ClientListPayload = {
//     payloadType: PayloadSubType;
//     clients: RegisteredUser[];
// };
//
// export type ClientType = {
//     id: string;
//     user: RegisteredUser;
// };
//
// export type ProfileUpdatePayload = {
//     payloadType: PayloadSubType.profileUpdate;
//     clientDbId: ClientId;
//     username: string;
//     color: string;
//     pictureUrl: string;
// };
//
// export type AuthenticatedPayload = {
//     payloadType: PayloadSubType.auth;
//     clientUsername: string;
//     clientDbId: ClientId;
// };
//
// /**
//  * Represents a registered user.
//  */
// export type RegisteredUser = {
//     id: string;
//     username: string;
//     clientColor: string;
//     profilePhotoUrl: string;
// };
// export type PayloadType = {
//     payloadType: PayloadSubType;
// };
//
// export type MessageListPayload = {
//     payloadType: PayloadSubType.messageList;
//     messages: MessageList[];
// };
//
// export type MessageType = {
//     id: string;
//     messageDbId: string;
//     time: string;
//     message: string;
// };
//
// export type MessageList = {
//     users: RegisteredUser;
//     messageType: MessageType;
//     quoteType: QuoteType;
//     reactions: ReactionType[];
// };
//
//
// export enum PayloadSubType {
//     auth,
//     message,
//     clientList,
//     profileUpdate,
//     messageList,
//     typing,
//     force,
//     reaction,
// }
// // export type UserType = {
// //     clientDbId: ClientId;
// //     clientUsername: string;
// //     clientProfilePhoto: string;
// // };
// export type UserType = {
//     userId: string;
//     userName: string;
//     userProfilePhoto: string;
// };
//
// export type QuoteType = {
//     id: number;
//     quoteId: string;
//     quoteSenderId: string;
//     quoteMessage: string;
//     quoteTime: string;
//     payloadId: number;
// };
//
// export type ReactionType = {
//     messageDbId: string;
//     emojiName: string;
//     userId: string;
// };
// export type MessagePayload = {
//     payloadId?: number;
//     payloadType: PayloadSubType;
//     userType: UserType;
//     messageType: MessageType;
//     quoteType?: QuoteType;
//     reactionType?: ReactionType[];
// };

export type CallbackProps = {
	onOpen: () => void;
	onClose: () => void;
	onMessage: (event: MessageEvent) => void;
	onError: (event: Event) => void;
};

// export type InputProps = {
//     sendClientMessageToWebsocket: (message: string) => void;
// };
//
// export type HeaderProps = {
//     isConnected: boolean;
//     unreadMessages: number;
//     onReconnect: (socket: WebSocket) => void;
// };
//
/**
 * Represents the environment variables required for the application.
 */
export type EnvVars = {
	id: string;
	username: string;
	ip: string;
	port: string;
	os: string;
};
