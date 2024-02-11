import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputSection from "./ChatInputSection";
import { MessageBackToClients, MessageType, UserType } from "./../utils/customTypes";
import { formatTime } from "./../utils/time";
import { scrollToBottom } from "./../utils/functionality";
import { addMessageIfUniqueId } from "./../utils/storage";
import Header from "./Header";
import { WindowReloadApp } from "./../../wailsjs/runtime/runtime";
import { initWebSocket, sendClientMessageToWebsocket } from "./../utils/socket";
import { useEnvVarsStore } from "../stores/useEnvVarsStore";
import { EnvVars } from "../utils/customTypes";

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [guiHasFocus, setGuiHasFocus] = useState(true);
    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const [messagesMap, setMessagesMap] = useState<Map<string, UserType & MessageType>>(new Map());
    const { zustandVar: envVars } = useEnvVarsStore();

    useAddWindowFocusListener(setGuiHasFocus);
    useUpdatePanelView(endOfListRef, messagesMap, unreadMessages, setUnreadMessages, guiHasFocus);

    useEffect(() => {
        initWebSocket({
            onOpen: () => setNewConnectionStatus(true, setIsConnected),
            onClose: () => setNewConnectionStatus(false, setIsConnected),
            onMessage: (event) => handleIncomingMessages(event, messagesMap, setMessagesMap, envVars),
            onError: (event) => console.error(event),
            envVars: envVars,
        });
    }, []);

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    profileImageUrl="https://avatars.githubusercontent.com/u/117000423?v=4"
                    chatName={envVars.username}
                    isConnected={isConnected}
                    unreadMessages={unreadMessages}
                    onReconnect={() => reconnectToWebsocket()}
                />
                <div className="grow overflow-y-scroll px-2 pt-2 hover:overflow-scroll">
                    {Array.from(messagesMap.entries()).map((entry) => (
                        <ChatBubble
                            key={entry[0]}
                            name={entry[1].name}
                            message={entry[1].message}
                            isUser={entry[1].name === envVars.username}
                            profilePhoto={"https://avatars.githubusercontent.com/u/117000423?v=4"}
                        />
                    ))}
                    <div ref={endOfListRef} />
                </div>
                <div className="grow-0">
                    <ChatInputSection sendClientMessageToWebsocket={sendClientMessageToWebsocket} />
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
function setNewConnectionStatus(
    newStatus: boolean,
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
): void {
    setIsConnected(newStatus);
}

function handleIncomingMessages(
    event: MessageEvent,
    messagesMap: Map<string, UserType & MessageType>,
    setMessagesMap: React.Dispatch<React.SetStateAction<Map<string, UserType & MessageType>>>,
    envVars: EnvVars
) {
    const dataAsObject: MessageBackToClients = JSON.parse(event.data);
    addMessageIfUniqueId(messagesMap, setMessagesMap, dataAsObject, envVars);
}

/**
 * Updates the panel view by scrolling to the bottom of the list.
 * @param endOfListRef - The reference to the HTMLDivElement at the end of the list.
 * @param messagesMap - The map containing the messages.
 */
function useUpdatePanelView(
    endOfListRef: React.RefObject<HTMLDivElement>,
    messagesMap: Map<string, UserType & MessageType>,
    unreadMessages: number,
    setUnreadMessages: React.Dispatch<React.SetStateAction<number>>,
    guiHasFocus: boolean
) {
    if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        //only scroll if client is "up to date"
        if (guiHasFocus && unreadMessages === 0) {
            scrollToBottom(endOfListRef);
        } else {
            setUnreadMessages((prev) => prev + 1);
        }
    }, [messagesMap]);
}

/**
 * Reconnects to the WebSocket by restarting the frontend.
 */
function reconnectToWebsocket() {
    WindowReloadApp();
}

/**
 * Adds a window focus listener to track the focus state of the GUI.
 * @param setGuiHasFocus - A state setter function to update the GUI focus state.
 */
function useAddWindowFocusListener(setGuiHasFocus: Dispatch<SetStateAction<boolean>>) {
    useEffect(() => {
        window.addEventListener("focus", () => {
            setGuiHasFocus(true);
        });

        window.addEventListener("blur", () => {
            setGuiHasFocus(false);
        });
    }, []);
}
