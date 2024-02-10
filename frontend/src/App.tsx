import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInputSection from "./components/ChatInputSection";
import { MessageBackToClients, MessageType, UserType } from "./utils/types";
import { formatTime } from "./utils/time";
import { scrollToBottom } from "./utils/functionality";
import { addMessageIfUniqueId } from "./utils/storage";
import { getClientUsername } from "./utils/envVariables";
import Header from "./components/Header";
import { WindowReloadApp } from "./../wailsjs/runtime/runtime";
import {
    initWebSocket,
    sendClientMessageToWebsocket,
} from "./utils/socket";
import Chat from "./components/Chat";

/**
 * The main component of the application.
 * Renders all interfaces.
 */
function App() {

    return (
        <>
            <Chat />
        </>
    );
}

export default App;
