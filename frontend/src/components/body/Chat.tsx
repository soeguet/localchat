import {useEffect, useRef, useState} from "react";
import ChatBubble from "../ChatBubble";
import ChatInputSection from "../ChatInputSection";
import TypingIndicator from "../TypingIndicator";
import Header from "../Header";
import {WindowMinimise, WindowReloadApp, WindowShow, WindowUnminimise} from "../../../wailsjs/runtime";
import {initWebSocket, sendClientMessageToWebsocket} from "../../utils/socket";
import {ClientListPayload, MessagePayload, PayloadSubType, RegisteredUser} from "../../utils/customTypes";
import useUserStore from "../../stores/userStore";
import useClientStore, {getClientById} from "../../stores/clientsStore";
import useEnvironmentStore from "../../stores/environmentStore";
import useTypingStore from "../../stores/typingStore";
import {useTranslation} from "react-i18next";
import {Notification} from "../../../wailsjs/go/main/App";
import {useWindowFocussedListener} from "../../hooks/body/useWindowFocussedListener";
import useMessageMapStore from "../../stores/messageMapStore";
import {useScrollToBottom} from "../../hooks/body/useScrollToBottom";
import useDoNotDisturbStore from "../../stores/doNotDisturbStore";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    const {t} = useTranslation();
    const endOfListRef = useRef<HTMLDivElement | null>(null);
    const guiHasFocus = useWindowFocussedListener();

    // message state && refs
    const [unreadMessages, setUnreadMessages] = useState(0);
    // const [messagesMap, setMessagesMap] = useState<Map<string, MessagePayload>>(new Map());

    const {messageMap, onMessage} = useMessageMapStore();
    // socket state
    const [isConnected, setIsConnected] = useState(false);
    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const socketPort = useEnvironmentStore((state) => state.socketPort);
    const [disableClickable, setDisableClickable] = useState(false);

    // typing state
    const addTypingClientId = useTypingStore((state) => state.addTypingClientId);
    const removeTypingClientId = useTypingStore((state) => state.removeTypingClientId);
    const typingClientIds = useTypingStore((state) => state.typingClientIds);

    // this client state
    const clientId = useUserStore((state) => state.myId);
    const thisClient: RegisteredUser | undefined = useClientStore((state) =>
        state.clients.find((c) => c.id === clientId)
    );

    const setClients = useClientStore((state) => state.setClients);


    useEffect(() => {
        console.log("Connecting to WebSocket");
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, [socketIp, socketPort]);

    function handeMessageListPayload(data: string) {
        const messageListPayload = JSON.parse(data) as {
            payloadType: PayloadSubType.messageList;
            messageList: MessagePayload[];
        };

        if (messageListPayload.messageList === undefined || messageListPayload.messageList === null) {
            throw new Error("messageListPayload.payload is empty");
        }

        messageListPayload.messageList.forEach((messagePayload) => {
            // addMessageIfUniqueId(messageMap, setMessageMap, messagePayload, false);
            onMessage(messagePayload);
        });
    }

    useScrollToBottom(endOfListRef);

    function handleIncomingMessages(event: MessageEvent) {
        const dataAsObject = JSON.parse(event.data);
        //
        console.log("dataAsObject", dataAsObject);

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
                // addMessageIfUniqueId(messageMap, setMessageMap, JSON.parse(event.data) as MessagePayload, true);
                onMessage(JSON.parse(event.data) as MessagePayload);
                break;

            case PayloadSubType.messageList:
                handeMessageListPayload(event.data);
                break;

            case PayloadSubType.typing:
                if (dataAsObject.clientId === undefined || dataAsObject.isTyping === undefined) {
                    throw new Error("Typing payload is missing client ID or typing status");
                }
                if (dataAsObject.isTyping) {
                    addTypingClientId(dataAsObject.clientId);
                } else {
                    removeTypingClientId(dataAsObject.clientId);
                }
                console.log("typingUsers", typingClientIds);
                break;

            case PayloadSubType.force:

                if (dataAsObject.clientId === clientId) {
                    // just to be safe, if the client does not want to get notifications!
                    if (!useDoNotDisturbStore.getState().doNotDisturb) {
                        Notification("ALARM", "PLEASE CHECK THE CHAT");

                        setTimeout(() => {
                            WindowUnminimise();
                        }, 1000);
                        WindowMinimise();
                        WindowShow();
                    }
                }
                break;
            // unknown payload type
            default:
                console.log("Unknown payload type", dataAsObject);
                throw new Error("Unknown payload type");
        }
    }

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
        const timeout = setTimeout(() => {
            setDisableClickable(true);

            return () => {
                clearTimeout(timeout);
                setDisableClickable(false);
            };
        }, 2000);

        return (
            <>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="text-lg font-semibold text-gray-800 mb-4">{t("client_not_found")}</div>
                    <button
                        onClick={() => reconnectToWebsocket()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:border-black"
                        disabled={!disableClickable}
                    >
                        {t("button_reconnect")}
                    </button>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header
                    isConnected={isConnected}
                    unreadMessages={unreadMessages}
                    onReconnect={() => reconnectToWebsocket()}
                />
                <div className="grow overflow-y-auto px-5 pt-2">
                    {Array.from(messageMap.entries()).map((entry) => (
                        <ChatBubble
                            key={entry[0]}
                            id={entry[0]}
                            clientId={entry[1].userType.clientId}
                            username={
                                entry[1].userType.clientId === clientId
                                    ? thisClient?.username
                                    : getClientById(entry[1].userType.clientId)?.username || t("unknown")
                            }
                            message={entry[1].messageType.message}
                            isUser={entry[1].userType.clientId === clientId}
                            messagePayload={entry[1]}
                        />
                    ))}
                    <div ref={endOfListRef} />
                </div>
                {typingClientIds.length !== 0 && <TypingIndicator typingUsers={typingClientIds} />}
                <div className="grow-0">
                    <ChatInputSection sendClientMessageToWebsocket={sendClientMessageToWebsocket} />
                </div>
            </div>
        </>
    );
}

export default App;