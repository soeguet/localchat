import { GetLocalChatEnvVars } from "../../wailsjs/go/main/App";

async function retrieveLocalClientEnvVariables() {
    const clientEnvVars = await GetLocalChatEnvVars();
    return JSON.parse(clientEnvVars);
}

let clientUsername: string,
    socketIp: string,
    socketPort: string,
    clientOs: string;

async function initializeEnvVars() {
    await retrieveLocalClientEnvVariables()
        .then((envVars) => {
            console.log("envVars: " + envVars);
            clientUsername = envVars.username;
            socketIp = envVars.ip;
            socketPort = envVars.port;
            clientOs = envVars.os;
        })
        .catch((err) => {
            console.error(
                "Error occurred while retrieving environment variables: " + err
            );
            throw new Error(
                "Error occurred while retrieving environment variables."
            );
        });
}

export function getClientUsername() {
    return clientUsername;
}

export function getSocketIp() {
    console.log("socket ip: " + socketIp);
    return socketIp;
}

export function getSocketPort() {
    console.log("socket port: " + socketPort);
    return socketPort;
}

export function getClientOs() {
    return clientOs;
}

await initializeEnvVars();
