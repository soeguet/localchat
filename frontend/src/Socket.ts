import { GetLocalChatUsername, Notification } from "./../wailsjs/go/main/App";

/**
 * Represents a WebSocket connection.
 */
const socket = new WebSocket("ws://localhost:5555");

// socket opened
socket.addEventListener("open", async (event) => {
    Notification("localchat", "Connection opened");
    const username = await GetLocalChatUsername();
    console.log("Username: " + username);
    socket.send(JSON.stringify({ type: "auth", username: username }));
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
