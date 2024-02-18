/**
 * Represents a message sent back to clients.
 */
export type MessageBackToClients = {
    id: string;
    sender: string;
    message: string;
};

export enum PayloadSubType {
    auth,
    message,
    clientList,
}

export type ClientListPayload = {
    type: PayloadSubType.clientList;
    clients: string;
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

/**
 * Represents a user.
 */
export type UserType = {
    id: string;
    username: string;
    isUser: boolean;
    profilePhoto: string;
};
export type PayloadType = {
    type: PayloadSubType;
};

/**
 * Represents a message with its content and timestamp.
 */
export type MessageType = {
    message: string;
    time: string;
};

export type QuoteType = {
    message: string;
    time: string;
    sender: string;
};

export type MessagePayload = {
    id?: string;
    type: PayloadSubType;
    user: UserType;
    message: MessageType;
    quote?: QuoteType;
};

export type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent) => void;
    onError: (event: Event) => void;
};

export type MessageProps = {
    id: string;
    message: string;
    isUser: boolean;
    username: string;
    messagePayload: MessagePayload;
    profilePhoto: string;
};

export type InputProps = {
    sendClientMessageToWebsocket: (message: string) => void;
};

export type EmojiProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export type HeaderProps = {
    profileImageUrl: string;
    chatName: string;
    isConnected: boolean;
    unreadMessages: number;
    onReconnect: (socket: WebSocket) => void; // Funktion zum Wiederverbinden
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
