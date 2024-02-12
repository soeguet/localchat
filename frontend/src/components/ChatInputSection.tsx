import { useState } from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";

type InputProps = {
    sendClientMessageToWebsocket: (message: string) => void;
};

function ChatInputSection(inputProps: InputProps) {
    const [message, setMessage] = useState("");

    function handleSendMessage(message: string) {
        if (message.trim()) {
            inputProps.sendClientMessageToWebsocket(message);
            setMessage("");
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(message);
        }
    }

    return (
        <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-4">
            <Emoji message={message} setMessage={setMessage} />
            <button className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-paperclip">📎</i>
            </button>
            <div className="flex-1 mx-2 my-auto flex flex-col gap-2">
                <Reply />
                <textarea
                    className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></textarea>
            </div>
            <button
                className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                onClick={() => handleSendMessage(message)}
            >
                Send
            </button>
        </div>
    );
}

export default ChatInputSection;
