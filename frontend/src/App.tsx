import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInputSection from "./components/ChatInputSection";

function App() {
    type userType = {
        name: string;
        isUser: boolean;
        profilePhoto: string;
    };

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
    }, [testData]);

    async function scrollToBottom() {
        endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    async function sendNotification() {
        const message = testData[testData.length - 1].message;
    }

    function displayMessage(text: string): void {
        const newMessage = {
            name: "Me",
            isUser: true,
            profilePhoto:
                "",
            message: text,
            time: "10:46 PM",
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
