import { useEffect, useRef, useState } from "react";
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

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    const [messagesMap, setMessagesMap] = useState<
        Map<string, UserType & MessageType>
    >(new Map());
    const [isConnected, setIsConnected] = useState(false);

    addEventListenerToSocket(messagesMap, setMessagesMap, setIsConnected);

    

    const endOfListRef = useRef<HTMLDivElement | null>(null);
    updatePanelView(endOfListRef, messagesMap);

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    profileImageUrl="/home/soeguet/Pictures/dcabb7fbb2f763d680d20a3d228cc6f9.jpg"
                    chatName={getClientUsername()}
                    isConnected={isConnected}
                    unreadMessages={0}
                    onReconnect={() => reconnectToWebsocket()}
                />
                <div className="grow overflow-y-scroll px-2 pt-2 hover:overflow-scroll">
                    {Array.from(messagesMap.entries()).map((entry) => (
                        <ChatBubble
                            key={entry[0]}
                            name={entry[1].name}
                            time={formatTime(new Date())}
                            message={entry[1].message}
                            isUser={entry[1].name === getClientUsername()}
                            profilePhoto={""}
                        />
                    ))}
                    <div ref={endOfListRef} />
                </div>
                <div className="grow-0">
                    <ChatInputSection
                        sendClientMessageToWebsocket={
                            sendClientMessageToWebsocket
                        }
                    />
                </div>
            </div>
        </>
    );
}

export default App;

function setNewConnectionStatus(connected: boolean, setIsConnected: React.Dispatch<React.SetStateAction<boolean>>): void {
    setIsConnected(connected);
}

function handleIncomingMessages(event: MessageEvent<any>, messagesMap: Map<string, UserType & MessageType>, setMessagesMap: React.Dispatch<React.SetStateAction<Map<string, UserType & MessageType>>>) {
    const dataAsObject: MessageBackToClients = JSON.parse(event.data);
    addMessageIfUniqueId(messagesMap, setMessagesMap, dataAsObject);
}

/**
 * Adds an event listener to the socket to handle incoming messages.
 * @param messagesMap - The map of messages.
 * @param setMessagesMap - The function to update the messages map.
 */
function addEventListenerToSocket(
    messagesMap: Map<string, UserType & MessageType>,
    setMessagesMap: React.Dispatch<
        React.SetStateAction<Map<string, UserType & MessageType>>
    >,
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
) {
    useEffect(() => {
        initWebSocket({
            onOpen: () => setNewConnectionStatus(true, setIsConnected),
            onClose: () => setNewConnectionStatus(false, setIsConnected),
            onMessage: (event) =>
                handleIncomingMessages(event, messagesMap, setMessagesMap),
            onError: (event) => console.error(event),
        });
    }, []);
}

/**
 * Updates the panel view by scrolling to the bottom of the list.
 * @param endOfListRef - The reference to the HTMLDivElement at the end of the list.
 * @param messagesMap - The map containing the messages.
 */
function updatePanelView(
    endOfListRef: React.RefObject<HTMLDivElement>,
    messagesMap: Map<string, UserType & MessageType>
) {
    if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        scrollToBottom(endOfListRef);
    }, [messagesMap]);
}

function reconnectToWebsocket() {
    console.log("reconnecting to websocket");
    WindowReloadApp()
}