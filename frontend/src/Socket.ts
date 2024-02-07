import { Notification } from "./../wailsjs/go/main/App";

const socket = new WebSocket("ws://localhost:5555");

// socket opened
socket.addEventListener("open", (event) => {
    Notification("localchat", "Connection opened");
    socket.send(JSON.stringify({ type: "auth", username: "ossi" }));
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
