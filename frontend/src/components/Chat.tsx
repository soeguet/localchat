import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputSection from "./ChatInputSection";
import { MessageBackToClients, MessageType, UserType } from "./../utils/types";
import { formatTime } from "./../utils/time";
import { scrollToBottom } from "./../utils/functionality";
import { addMessageIfUniqueId } from "./../utils/storage";
import { getClientUsername } from "./../utils/envVariables";
import Header from "./Header";
import { WindowReloadApp } from "./../../wailsjs/runtime/runtime";
import {
    initWebSocket,
    sendClientMessageToWebsocket,
} from "./../utils/socket";

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {

    const [isConnected, setIsConnected] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [guiHasFocus, setGuiHasFocus] = useState(true);
    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const [messagesMap, setMessagesMap] = useState<
        Map<string, UserType & MessageType>
    >(new Map());

    addWindowFocusListener(setGuiHasFocus);
    addEventListenerToSocket(messagesMap, setMessagesMap, setIsConnected);
    updatePanelView(endOfListRef, messagesMap, unreadMessages, setUnreadMessages, guiHasFocus);

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    profileImageUrl="https://avatars.githubusercontent.com/u/117000423?v=4"
                    chatName={getClientUsername()}
                    isConnected={isConnected}
                    unreadMessages={unreadMessages}
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
                            profilePhoto={"https://avatars.githubusercontent.com/u/117000423?v=4"}
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

/**
 * Sets the new connection status.
 * @param newStatus - The new connection status.
 * @param setIsConnected - The state setter function for the connection status.
 */
function setNewConnectionStatus(newStatus: boolean, setIsConnected: React.Dispatch<React.SetStateAction<boolean>>): void {
    setIsConnected(newStatus);
}

/**
 * Handles incoming messages from the server.
 * @param event - The message event.
 * @param messagesMap - The map of messages.
 * @param setMessagesMap - The state setter for the messages map.
 */
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
    messagesMap: Map<string, UserType & MessageType>,
    unreadMessages: number,
    setUnreadMessages: React.Dispatch<React.SetStateAction<number>>,
    guiHasFocus: boolean,
) {
    if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        //only scroll if client is "up to date"
        if (guiHasFocus && unreadMessages === 0) {
            scrollToBottom(endOfListRef);
        } else {
            setUnreadMessages(prev => prev + 1);
        }

    }, [messagesMap]);
}

/**
 * Reconnects to the WebSocket by restarting the frontend.
 */
function reconnectToWebsocket() {
    WindowReloadApp()
}

/**
 * Adds a window focus listener to track the focus state of the GUI.
 * @param setGuiHasFocus - A state setter function to update the GUI focus state.
 */
function addWindowFocusListener(setGuiHasFocus: Dispatch<SetStateAction<boolean>>) {

    useEffect(() => {

        window.addEventListener('focus', () => {
            setGuiHasFocus(true);
        });

        window.addEventListener('blur', () => {
            setGuiHasFocus(false);
        });

    }, []);
}
