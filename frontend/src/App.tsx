import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInputSection from "./components/ChatInputSection";
import { Notification } from "./../wailsjs/go/main/App"
function App() {

    type MessageBackToClients = {
        sender: string;
        message: string;
    };

    type userType = {
        name: string;
        isUser: boolean;
        profilePhoto: string;
    };

    const socket = new WebSocket("ws://localhost:5555");
    // message is received
    socket.addEventListener("message", event => {
        const dataAsObject:MessageBackToClients = JSON.parse(event.data);
        displayMessage(dataAsObject)
    });

    // socket opened
    socket.addEventListener("open", event => {
        socket.send(JSON.stringify({ type: "auth", username: "ossi" }));
    });

    // socket closed
    socket.addEventListener("close", event => { });

    // error handler
    socket.addEventListener("error", event => { });

    type messageType = {

        message: string;
        time: string;
    };

    const [testData, setTestData] = useState<(userType & messageType)[]>([
        {
            name: "John Doe",
            isUser: false,
            profilePhoto:
                "",
            message: "Hello",
            time: "10:45 PM",
        },
    ]);

    const endOfListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (testData.length > 0) {
            scrollToBottom();
            sendNotification();
        }
        Notification(testData[testData.length - 1].message)
    }, [testData]);

    async function scrollToBottom() {
        endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    async function sendNotification() {
        const message = testData[testData.length - 1].message;
    }

    function displayMessage(dataAsObject: MessageBackToClients): void {
        const newMessage = {
            name: dataAsObject.sender,
            isUser: dataAsObject.sender === "ossi",
            profilePhoto:
                "",
            message: dataAsObject.message,
            time: Date.now().toString(),
        };
        setTestData((prev) => [...prev, newMessage]);
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <div className="grow overflow-y-scroll px-2 pt-2 hover:overflow-scroll">
                    {testData.map((data, index) => (
                        <ChatBubble
                            key={index}
                            name={data.name}
                            time={data.time}
                            message={data.message}
                            isUser={data.isUser}
                            profilePhoto={data.profilePhoto}
                        />
                    ))}
                    <div ref={endOfListRef} />
                </div>
                <div className="grow-0">
                    <ChatInputSection onSend={displayMessage} />
                </div>
            </div>
        </>
    );
}

export default App;
