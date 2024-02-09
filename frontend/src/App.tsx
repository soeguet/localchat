import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInputSection from "./components/ChatInputSection";
import socket from "./Socket";
import { MessageBackToClients, MessageType, UserType } from "./utils/types";
import { formatTime } from "./utils/time";
import { scrollToBottom } from "./utils/functionality";
import { addMessageIfUniqueId } from "./utils/storage";
import { getClientUsername} from "./utils/envVariables";

/**
 * The main component of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {

    const [messagesMap, setMessagesMap] = useState<
        Map<string, UserType & MessageType>
    >(new Map());

    useEffect(() => {
        // WEBSOCKET CLIENT -- LISTENER METHOD -- message is received -- needs to be isolated, otherwise it will be called multiple times
        socket.addEventListener("message", async (event) => {
            const dataAsObject: MessageBackToClients = JSON.parse(event.data);
            await addMessageIfUniqueId(
                messagesMap,
                setMessagesMap,
                dataAsObject
            );
        });
    }, []);

    const endOfListRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        scrollToBottom(endOfListRef);
    }, [messagesMap]);

    /**
     * Sends a client message to the websocket.
     * @param message - The message to send.
     */
    function sendClientMessageToWebsocket(message: string): void {
        socket.send(JSON.stringify({ type: "message", message: message }));
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
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
