/**
 * Represents a message sent back to clients.
 */
export type MessageBackToClients = {
    id: string;
    sender: string;
    message: string;
};

/**
 * Represents a user.
 */
export type UserType = {
    name: string;
    isUser: boolean;
    profilePhoto: string;
};

/**
 * Represents a message with its content and timestamp.
 */
export type MessageType = {
    message: string;
    time: string;
};

export type CallbackProps = {
    onOpen: () => void;
    onClose: () => void;
    onMessage: (event: MessageEvent) => void;
    onError: (event: Event) => void;
    envVars: EnvVars | null;
};

export type messageProps = {
    id: string;
    message: string;
    isUser: boolean;
    username: string;
    profilePhoto: string;
};

export type InputProps = {
    sendClientMessageToWebsocket: (message: string) => void;
};

export type EmojiProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export type FormProps = {
    checkIfEnvVarsAllSet: (envVars: EnvVars|null) => void;
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
    username: string;
    ip: string;
    port: string;
    os: string;
};

/**
 * Represents the state of environment variables in Zustand.
 */
export type EnvVarsState = {
    zustandVar: EnvVars | null;
    setEnvVars: (newEnvVars: EnvVars | null) => void;
    checkIfAllEnvVarsAreSet: () => boolean;
    saveVarsLocally: () => void;
};