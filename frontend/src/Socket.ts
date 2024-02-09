import { Notification } from "./../wailsjs/go/main/App";
import { getClientUsername, getSocketIp, getSocketPort } from "./utils/envVariables";

/**
 * Represents a WebSocket connection.
 */
const socket = new WebSocket(`ws://${getSocketIp()}:${getSocketPort()}`);

// socket opened
socket.addEventListener("open", async (event) => {
    Notification("localchat", "Connection opened");
    socket.send(JSON.stringify({ type: "auth", username: getClientUsername() }));
});

// socket closed
socket.addEventListener("close", (event) => {
    Notification("localchat", "Connection closed: " + event.reason);
});

// error handler
socket.addEventListener("error", (event) => {
    Notification("localchat", "Error occurred: " + event);
});

export default socket;
