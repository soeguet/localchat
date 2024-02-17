import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputSection from "./ChatInputSection";
import { scrollToBottom } from "./../utils/functionality";
import { addMessageIfUniqueId } from "./../utils/storage";
import Header from "./Header";
import { WindowReloadApp } from "./../../wailsjs/runtime/runtime";
import { initWebSocket, sendClientMessageToWebsocket } from "../utils/socket";
import useEnvVarsStore from "../stores/envVarsStore";
import { MessagePayload, EnvVars, PayloadSubType, ClientListPayload, RegisteredUser } from "../utils/customTypes";

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [guiHasFocus, setGuiHasFocus] = useState(true);
    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const [messagesMap, setMessagesMap] = useState<Map<string, MessagePayload>>(new Map());
    const zustandVar = useEnvVarsStore.getState().zustandVar;

    if (zustandVar === null) {
        return <div>loading...</div>;
    }

    useAddWindowFocusListener(setGuiHasFocus);
    useUpdatePanelView(endOfListRef, messagesMap, unreadMessages, setUnreadMessages, guiHasFocus);

    useEffect(() => {
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event, messagesMap, setMessagesMap, zustandVar),
            onError: (event) => console.error(event),
            envVars: zustandVar,
        });
    }, []);

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    profileImageUrl="https://avatars.githubusercontent.com/u/117000423?v=4"
                    chatName={zustandVar.username}
                    isConnected={isConnected}
                    unreadMessages={unreadMessages}
                    onReconnect={() => reconnectToWebsocket()}
                />
                <div className="grow overflow-y-scroll px-2 pt-2 hover:overflow-scroll">
                    {Array.from(messagesMap.entries()).map((entry) => (
                        <ChatBubble
                            key={entry[0]}
                            id={entry[0]}
                            username={entry[1].user.username}
                            message={entry[1].message.message}
                            isUser={entry[1].user.username === zustandVar.username}
                            messagePayload={entry[1]}
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

function handleIncomingMessages(
    event: MessageEvent,
    messagesMap: Map<string, MessagePayload>,
    setMessagesMap: React.Dispatch<React.SetStateAction<Map<string, MessagePayload>>>,
    envVars: EnvVars | null
) {
    const dataAsObject: { type: PayloadSubType; clients: string } = JSON.parse(event.data);
    switch (dataAsObject.type) {
        // update the client list with new data
        case PayloadSubType.clientList:
            if (dataAsObject.clients === undefined || dataAsObject.clients === null || dataAsObject.clients === "") {
                throw new Error("Client list is empty");
            }
            handleClientListPayload(JSON.parse(dataAsObject.clients) as RegisteredUser[]);

            break;

        // normal chat messages
        case PayloadSubType.message:
            addMessageIfUniqueId(messagesMap, setMessagesMap, JSON.parse(event.data) as MessagePayload, envVars);
            break;

        // unknown payload type
        default:
            throw new Error("Unknown payload type");
    }
}

function handleClientListPayload(payload: RegisteredUser[]) {}

/**
 * Updates the panel view by scrolling to the bottom of the list.
 * @param endOfListRef - The reference to the HTMLDivElement at the end of the list.
 * @param messagesMap - The map containing the messages.
 */
function useUpdatePanelView(
    endOfListRef: React.RefObject<HTMLDivElement>,
    messagesMap: Map<string, MessagePayload>,
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
