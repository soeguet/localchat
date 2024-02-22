import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputSection from "./ChatInputSection";
import { scrollToBottom } from "./../utils/functionality";
import { addMessageIfUniqueId } from "./../utils/storage";
import Header from "./Header";
import { WindowReloadApp } from "./../../wailsjs/runtime/runtime";
import { initWebSocket, sendClientMessageToWebsocket } from "../utils/socket";
import { ClientListPayload, MessagePayload, PayloadSubType, RegisteredUser } from "../utils/customTypes";
import useUserStore from "../stores/userStore";
import useClientsStore from "../stores/clientsStore";

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

    const thisClient: RegisteredUser | undefined = useClientsStore((state) =>
        state.clients.find((c) => c.id === clientId)
    );
    console.log("clientUsername", thisClient);

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
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, []);

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

    function handleIncomingMessages(event: MessageEvent) {
        const dataAsObject = JSON.parse(event.data);
        switch (dataAsObject.type) {
            // update the client list with new data
            case PayloadSubType.clientList || PayloadSubType.profileUpdate:
                console.log("PROFILE UPDATE triggered");
                console.log(dataAsObject);
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
        console.log("handleClientListPayload triggered");
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
        return <div>Client not found</div>;
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
                            clientId={entry[1].user.id}
                            username={entry[1].user.id === clientId ? thisClient?.username : entry[1].user.username}
                            message={entry[1].message.message}
                            isUser={entry[1].user.id === clientId}
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
