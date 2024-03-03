import { useEffect } from "react";
import useEnvironmentStore from "../../stores/environmentStore";
import useWebsocketStore from "../../stores/websocketStore";
import { initWebSocket } from "../../utils/socket";
import { ClientListPayload, MessagePayload, PayloadSubType, RegisteredUser } from "../../utils/customTypes";
import useClientsStore, { getClientById } from "../../stores/clientsStore";
import useMessageMapStore from "../../stores/messageMapStore";
import useTypingStore from "../../stores/typingStore";
import useUserStore from "../../stores/userStore";
import useDoNotDisturbStore from "../../stores/doNotDisturbStore";
import { MakeWindowsTaskIconFlash, Notification } from "../../../wailsjs/go/main/App";
import { WindowIsMinimised, WindowMinimise, WindowShow, WindowUnminimise } from "../../../wailsjs/runtime";
import { useTranslation } from "react-i18next";
import useChatBottomRefVisibleStore from "../../stores/chatBottomRefVisibleStore";
import { checkIfScrollToBottomIsNeeded } from "../../utils/scrollToBottomNeeded";
import useUnseenMessageCountStore from "../../stores/unseenMessageCountStore";

function useConnection() {
    const { t } = useTranslation();
    const socketIp = useEnvironmentStore((state) => state.socketIp);
    const socketPort = useEnvironmentStore((state) => state.socketPort);
    const setIsConnected = useWebsocketStore((state) => state.setIsConnected);
    const setClients = useClientsStore((state) => state.setClients);
    const onMessage = useMessageMapStore((state) => state.onMessage);

    const clientId = useUserStore((state) => state.myId);
    // typing state
    const addTypingClientId = useTypingStore((state) => state.addTypingClientId);
    const removeTypingClientId = useTypingStore((state) => state.removeTypingClientId);

    useEffect(() => {
        //console.log("Connecting to WebSocket");
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, [socketIp, socketPort]);

    function checkIfNotificationIsNeeded(messagePayload: MessagePayload, messageSenderName: string) {
        // no message allowed if "do not disturb" is active
        if (useDoNotDisturbStore.getState().doNotDisturb) {
            return;
        }
        // no message needed if message from this client
        if (messagePayload.userType.clientId === clientId) {
            return;
        }
        // no message needed if already at chat bottom
        if (useChatBottomRefVisibleStore.getState().chatBottomRefVisible) {
            return;
        }

        const titleNotification = messagePayload.messageType.time.slice(0, 5) + " - " + messageSenderName;
        Notification(titleNotification, messagePayload.messageType.message).then(() => {
            WindowIsMinimised().then((isMinimised) => {
                if (isMinimised) {
                    MakeWindowsTaskIconFlash("localchat");
                } else {
                    WindowShow();
                }
            });
        });
    }

    function checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayload: MessagePayload) {
        // if we don't need to scroll to the bottom, we need to add the message to the unseen messages list
        const addIdToList = !checkIfScrollToBottomIsNeeded();

        if (addIdToList) {
            useUnseenMessageCountStore.getState().addMessageToUnseenMessagesList(messagePayload.messageType.messageId);
        } else {
            console.log("Scroll to bottom is needed");
            useUnseenMessageCountStore.getState().resetUnseenMessageCount();
            console.log(useUnseenMessageCountStore.getState().unseenMessageCount);
        }
    }
    function handleClientListPayload(payloadAsString: string) {
        const payloadAsObject: ClientListPayload = JSON.parse(payloadAsString);
        const clients: RegisteredUser[] = payloadAsObject.clients;
        setClients(clients);
    }

    function handeMessageListPayload(data: string) {
        const messageListPayload = JSON.parse(data) as {
            payloadType: PayloadSubType.messageList;
            messageList: MessagePayload[];
        };

        if (messageListPayload.messageList === undefined || messageListPayload.messageList === null) {
            throw new Error("messageListPayload.payload is empty");
        }

        messageListPayload.messageList.forEach((messagePayload) => {
            onMessage(messagePayload);
        });
    }

    function handleIncomingMessages(event: MessageEvent) {
        const dataAsObject = JSON.parse(event.data);
        //
        //console.log("dataAsObject", dataAsObject);

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
            case PayloadSubType.message: {
                const messagePayload = JSON.parse(event.data) as MessagePayload;
                const messageSenderName =
                    getClientById(messagePayload.userType.clientId)?.username || t("unknown_user");
                // //console.log("messagePayload", messagePayload);

                onMessage(messagePayload);

                checkIfMessageIsToBeAddedToTheUnseenMessagesList(messagePayload);

                //display the message
                checkIfNotificationIsNeeded(messagePayload, messageSenderName);
                break;
            }

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
                break;

            case PayloadSubType.force:
                if (dataAsObject.clientId === clientId) {
                    // just to be safe if the client does not want to get notifications!
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
                //console.log("Unknown payload type", dataAsObject);
                throw new Error("Unknown payload type");
        }
    }
}

export default useConnection;
