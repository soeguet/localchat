/**custom
 * Represents a message sent back to clients.
 */
export type MessageBackToClients = {
    id: string;
    sender: string;
    message: string;
};

export type UserDatabaseRow = {
    id: string;
    user: RegisteredUser;
};

export type ClientListPayload = {
    payloadType: PayloadSubType;
    clients: RegisteredUser[];
};

export type ClientType = {
    id: string;
    user: RegisteredUser;
};

export type ProfileUpdatePayload = {
    payloadType: PayloadSubType.profileUpdate;
    clientId: string;
    username: string;
    color: string;
    pictureUrl: string;
};

export type AuthenticatedPayload = {
    payloadType: PayloadSubType.auth;
    clientUsername: string;
    clientId: string;
};

/**
 * Represents a registered user.
 */
export type RegisteredUser = {
    id: string;
    username: string;
    clientColor: string;
    profilePhotoUrl: string;
};
export type PayloadType = {
    payloadType: PayloadSubType;
};

export type MessageListPayload = {
    payloadType: PayloadSubType.messageList;
    messages: MessageList[];
};

export type MessageType = {
    id: string;
    messageId: string;
    time: string;
    message: string;
};

export type MessageList = {
    users: RegisteredUser;
    messageType: MessageType;
    quoteType: QuoteType;
    reactions: ReactionType[];
};


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
// export type UserType = {
//     clientId: string;
//     clientUsername: string;
//     clientProfilePhoto: string;
// };
export type UserType = {
    userId: string;
    userName: string;
    userProfilePhoto: string;
};

export type QuoteType = {
    id: number;
    quoteId: string;
    quoteSenderId: string;
    quoteMessage: string;
    quoteTime: string;
    payloadId: number;
};

export type ReactionType = {
    messageId: string;
    emojiName: string;
    userId: string;
};
export type MessagePayload = {
    payloadId?: number;
    payloadType: PayloadSubType;
    userType: UserType;
    messageType: MessageType;
    quoteType?: QuoteType;
    reactionType?: ReactionType[];
};

export type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent) => void;
    onError: (event: Event) => void;
};

export type InputProps = {
    sendClientMessageToWebsocket: (message: string) => void;
};

export type HeaderProps = {
    isConnected: boolean;
    unreadMessages: number;
    onReconnect: (socket: WebSocket) => void;
};

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
