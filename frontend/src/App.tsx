import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInputSection from "./components/ChatInputSection";
import { Notification } from "./../wailsjs/go/main/App"
import socket from "./Socket";

function App() {

    type MessageBackToClients = {
        id: string;
        sender: string;
        message: string;
    };

    type UserType = {
        name: string;
        isUser: boolean;
        profilePhoto: string;
    };

    type MessageType = {

        message: string;
        time: string;
    };

    const [messagesMap, setMessagesMap] = useState<Map<string, UserType & MessageType>>(new Map<string, UserType & MessageType>());

    useEffect(() => {
        scrollToBottom();
    }, [messagesMap]);

    function addMessageIfUniqueId(newMessage: MessageBackToClients) {

        const { id } = newMessage;

        if (!messagesMap.has(id)) {

            const newMapEntry = {
                name: newMessage.sender,
                isUser: newMessage.sender === "ossi",
                profilePhoto: "",
                message: newMessage.message,
                time: formatTime(new Date()),
            };
            setMessagesMap(prev => new Map(prev).set(newMessage.id, newMapEntry))

            // TODO put this somewhere else
            if (newMessage.sender !== "ossi") {
                Notification(newMessage.sender, newMessage.message);
            }

            console.log(`added message with id ${id} to map.`);
        } else {
            console.log(`rejected message with id ${id}since it already exists.`);
        }
    }
    function formatTime(date: Date): string {
        let hours: string | number = date.getHours();
        let minutes: string | number = date.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    const endOfListRef = useRef<HTMLDivElement | null>(null);

    // WEBSOCKET CLIENT -- LISTENER METHOD -- message is received
    socket.addEventListener("message", (event) => {
        // Notification("CLIENT: " + event.data)
        const dataAsObject: MessageBackToClients = JSON.parse(event.data);
        addMessageIfUniqueId(dataAsObject);
    });

    async function scrollToBottom(): Promise<void> {
        endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
    }


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
                            isUser={entry[1].name === "ossi"}
                            profilePhoto={""}
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