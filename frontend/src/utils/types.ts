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

/**
 * Represents the environment variables required for the application.
 */
export type EnvVars = {
    username: string;
    ip: string;
    port: string;
}
