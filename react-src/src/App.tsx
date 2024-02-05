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
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1wr1yrOBQiwirwFdBeIUAeIU9vPg09-NpaXWEipuyQ&s",
            message: "Hello",
            time: "10:45 PM",
        },

    ]);
    const endOfListRef = useRef<HTMLDivElement | null>(null); // Gibt den Typ explizit an


    useEffect(() => {
        if (testData.length > 0) {
            scrollToBottom();
        }
    }, [testData]);

    const scrollToBottom = () => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log("scrolling");
    };


    function displayMessage(text: string): void {
        const newMessage = {
            name: "Me",
            isUser: true,
            profilePhoto:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTknVlvLdeZKfg--zh687bCOU7R9mdf_KaleoQxTzMsgg&s",
            message: text,
            time: "10:46 PM",
        };
        setTestData((prev) => [...prev, newMessage]);
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <div className="px-2 pt-2 grow overflow-y-scroll hover:overflow-scroll">
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
