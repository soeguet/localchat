export enum PayloadSubType {
    auth,
    message,
    clientList,
    profileUpdate,
    messageList,
    typing,
    force,
    reaction,
}

/**
 * [[ RESULTING TYPE ]]
 *  export type AuthenticationPayload = {
 *     payloadType: PayloadSubType.auth;
 *     clientUsername: string;
 *     clientId: string;
 *  };
 */
export type AuthenticationPayload = {
    payloadType: PayloadSubType.auth;
} & Pick<ClientEntity, "clientId" | "clientUsername">;

/**
 * [[ RESULTING TYPE ]]
 *  export type ClientUpdatePayload = {
 *     payloadType: PayloadSubType.auth;
 *     clientId: string;
 *     clientUsername: string;
 *     clientColor?: string;
 *     clientProfileImage?: string;
 *  };
 */
export type ClientUpdatePayload = {
    payloadType: PayloadSubType.profileUpdate;
} & ClientEntity;

export type ClientListPayload = {
    payloadType: PayloadSubType.clientList;
    clients: ClientEntity[];
};

export type ClientEntity = {
    clientId: string;
    clientUsername: string;
    clientColor?: string;
    clientProfileImage?: string;
};

export type MessageEntity = {
    messageDbId: number;
    messageId: string;
    messageConext: string;
    messageTime: string;
    messageDate: string;
};

export type QuoteEntity = {
    quoteDbId: number;
    quoteMessageId: string;
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
 *          messageId: string;
 *          messageConext: string;
 *          messageTime: string;
 *          messageDate: Date;
 *      };
 *      clientType: {
 *          clientId: string;
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
 *    };
 */
export type MessagePayload = {
    payloadType: PayloadSubType.message;
    messageType: Omit<MessageEntity, "messageDbId">;
    clientType: Pick<ClientEntity, "clientId">;
    quoteType?: Omit<QuoteEntity, "quoteDbId">;
    reactionType?: Omit<ReactionEntity, "reactionDbId">[];
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
//     clientId: string;
//     username: string;
//     color: string;
//     pictureUrl: string;
// };
//
// export type AuthenticatedPayload = {
//     payloadType: PayloadSubType.auth;
//     clientUsername: string;
//     clientId: string;
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
//     messageId: string;
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
// //     clientId: string;
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
//     messageId: string;
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
