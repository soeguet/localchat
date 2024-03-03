import { useEffect } from "react";
import useWebsocketStore from "../../stores/websocketStore";
import { initWebSocket } from "../../utils/socket";
import { MessagePayload, PayloadSubType } from "../../utils/customTypes";
import { getClientById } from "../../stores/clientsStore";
import useMessageMapStore from "../../stores/messageMapStore";
import useTypingStore from "../../stores/typingStore";
import useUserStore from "../../stores/userStore";
import useDoNotDisturbStore from "../../stores/doNotDisturbStore";
import { Notification } from "../../../wailsjs/go/main/App";
import { WindowMinimise, WindowShow, WindowUnminimise } from "../../../wailsjs/runtime";
import { useTranslation } from "react-i18next";
import { handleClientListPayload, checkIfMessageIsToBeAddedToTheUnseenMessagesList, checkIfNotificationIsNeeded, handeMessageListPayload } from "./utils";

function useConnection() {
    const { t } = useTranslation();
    const { socketIp, socketPort, myId } = useUserStore();
    // typing state
    const { addTypingClientId, removeTypingClientId } = useTypingStore();

    const setIsConnected = useWebsocketStore((state) => state.setIsConnected);
    const onMessage = useMessageMapStore((state) => state.onMessage);

    useEffect(() => {
        //console.log("Connecting to WebSocket");
        initWebSocket({
            onOpen: () => setIsConnected(true),
            onClose: () => setIsConnected(false),
            onMessage: (event) => handleIncomingMessages(event),
            onError: (event) => console.error(event),
        });
    }, [socketIp, socketPort]);

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
                if (dataAsObject.clientId === myId) {
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
