import { useState } from "react";

type inputProps = {
    onSend: (message: string) => void;
};

const ChatInputSection = (props: inputProps) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            props.onSend(message);
            setMessage("");
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    async function sendNotification() {
        console.log("sendtestnotification1");
    }

    return (
        <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-4">
            <button
                onClick={sendNotification}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <i className="far fa-smile">😊</i>
            </button>
            <button className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-paperclip">📎</i>
            </button>
            <textarea
                className="mx-2 my-auto flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            ></textarea>
            <button
                className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                onClick={handleSendMessage}
            >
                Send
            </button>
        </div>
    );
};

export default ChatInputSection;
