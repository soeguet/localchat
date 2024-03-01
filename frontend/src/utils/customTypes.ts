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

export enum PayloadSubType {
    auth,
    message,
    clientList,
    profileUpdate,
    messageList,
    typing,
    force,
}
export type UserType = {
    clientId: string;
    clientUsername: string;
    clientProfilePhoto: string;
};
export type MessageType = {
    messageId: string;
    messageSenderId: string;
    time: string;
    message: string;
};
export type QuoteType = {
    quoteId: string;
    quoteSenderId: string;
    quoteMessage: string;
    quoteTime: string;
};
export type MessagePayload = {
    payloadType: PayloadSubType;
    userType: UserType;
    messageType: MessageType;
    quoteType?: QuoteType;
};

export type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent) => void;
    onError: (event: Event) => void;
};

export type MessageProps = {
    messagePayload: MessagePayload;
    lastMessageFromThisClientId: boolean;
    lastMessageTimestampSameAsThisOne: boolean;
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
