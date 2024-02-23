import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputSection from "./ChatInputSection";
import TypingIndicator from "./TypingIndicator";
import { scrollToBottom } from "./../utils/functionality";
import { addMessageIfUniqueId } from "./../utils/storage";
import Header from "./Header";
import { WindowReloadApp } from "./../../wailsjs/runtime/runtime";
import { initWebSocket, sendClientMessageToWebsocket } from "../utils/socket";
import { ClientListPayload, MessagePayload, PayloadSubType, RegisteredUser } from "../utils/customTypes";
import useUserStore from "../stores/userStore";
import useClientsStore, { getClientById } from "../stores/clientsStore";
import useEnvironmentStore from "../stores/environmentStore";

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    // const [guiHasFocus, setGuiHasFocus] = useState(true);
    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const [messagesMap, setMessagesMap] = useState<Map<string, MessagePayload>>(new Map());
    const clientId = useUserStore((state) => state.myId);

    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const socketPort = useEnvironmentStore((state) => state.socketPort);

    const [typingUsers, setTypingUsers] = useState(["OSMAN", "JAKOB", "JONAS", "OSMAN", "JAKOB", "JONAS"]);

    const thisClient: RegisteredUser | undefined = useClientsStore((state) =>
        state.clients.find((c) => c.id === clientId)
    );

    const setClients = useClientsStore((state) => state.setClients);

    // window focus state
    const guiHasFocus = useRef(true);
    useEffect(() => {
        const handleFocus = () => {
            guiHasFocus.current = true;
        };

        const handleBlur = () => {
            guiHasFocus.current = false;
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    useEffect(() => {
        console.log("Connecting to WebSocket");
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, [socketIp, socketPort]);

    useEffect(() => {
        if (endOfListRef.current) {
            endOfListRef.current.scrollIntoView({ behavior: "smooth" });
        }
        //only scroll if client is "up to date"
        if (guiHasFocus && unreadMessages === 0) {
            scrollToBottom(endOfListRef);
        } else {
            setUnreadMessages((prev) => prev + 1);
        }
    }, [messagesMap]);

    function handeMessageListPayload(data: string) {
        const messageListPayload = JSON.parse(data) as {
            payloadType: PayloadSubType.messageList;
            messageList: MessagePayload[];
        };

        if (messageListPayload.messageList === undefined || messageListPayload.messageList === null) {
            throw new Error("messageListPayload.payload is empty");
        }

        messageListPayload.messageList.forEach((messagePayload) => {
            addMessageIfUniqueId(messagesMap, setMessagesMap, messagePayload);
        });
    }

    function handleIncomingMessages(event: MessageEvent) {
        const dataAsObject = JSON.parse(event.data);
        //
        switch (dataAsObject.payloadType) {
            // update the client list with new data
            case PayloadSubType.clientList || PayloadSubType.profileUpdate:
                if (
                    dataAsObject.clients === undefined ||
                    dataAsObject.clients === null ||
                    dataAsObject.clients.length === 0
                ) {
                    throw new Error("Client list is empty");
                }
                handleClientListPayload(event.data);

                break;

            // normal chat messages
            case PayloadSubType.message:
                addMessageIfUniqueId(messagesMap, setMessagesMap, JSON.parse(event.data) as MessagePayload);
                break;

            case PayloadSubType.messageList:
                handeMessageListPayload(event.data);
                break;

            // unknown payload type
            default:
                throw new Error("Unknown payload type");
        }
    }

    /**
     * Updates the client list with the new data.
     * @param payload The new client list.
     * @returns void
     */
    function handleClientListPayload(payloadAsString: string) {
        const payloadAsObject: ClientListPayload = JSON.parse(payloadAsString);
        const clients: RegisteredUser[] = payloadAsObject.clients;
        setClients(clients);
    }

    /**
     * Reconnects to the WebSocket by restarting the frontend.
     */
    function reconnectToWebsocket() {
        WindowReloadApp();
    }

    if (thisClient === undefined) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="text-lg font-semibold text-gray-800 mb-4">Client not found</div>
                    <button
                        onClick={() => reconnectToWebsocket()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Reconnect
                    </button>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    profileImageUrl="https://avatars.githubusercontent.com/u/117000423?v=4"
                    isConnected={isConnected}
                    unreadMessages={unreadMessages}
                    onReconnect={() => reconnectToWebsocket()}
                />
                <div className="grow overflow-y-scroll px-2 pt-2 hover:overflow-scroll">
                    {Array.from(messagesMap.entries()).map((entry) => (
                        <ChatBubble
                            key={entry[0]}
                            id={entry[0]}
                            clientId={entry[1].userType.clientId}
                            username={
                                entry[1].userType.clientId === clientId
                                    ? thisClient?.username
                                    : getClientById(entry[1].userType.clientId)?.username || "Unknown"
                            }
                            message={entry[1].messageType.message}
                            isUser={entry[1].userType.clientId === clientId}
                            messagePayload={entry[1]}
                            profilePhoto={"https://avatars.githubusercontent.com/u/117000423?v=4"}
                        />
                    ))}
                    <div ref={endOfListRef} />
                </div>
                <TypingIndicator typingUsers={typingUsers} />
                <div className="grow-0">
                    <ChatInputSection sendClientMessageToWebsocket={sendClientMessageToWebsocket} />
                </div>
            </div>
        </>
    );
}

export default App;
