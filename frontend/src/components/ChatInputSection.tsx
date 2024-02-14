import { useState } from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";
import useReplyStore from "../stores/replyStore";
import { InputProps } from "../utils/customTypes";

function ChatInputSection(inputProps: InputProps) {
    const [message, setMessage] = useState("");

    function handleSendMessage(message: string) {
        if (message.trim()) {
            const { replyTo, setReplyTo } = useReplyStore.getState();

            inputProps.sendClientMessageToWebsocket(message);

            // reset replyTo state AFTER sending the message. we need that state for the message payload
            if (replyTo !== null) {
                setReplyTo(null);
            }
            setMessage("");
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(message);
        }
    }

    function httpRequest() {
        console.log("http request");
        fetch("http://localhost:5555/register-user").catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
        <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-4">
            <Emoji message={message} setMessage={setMessage} />
            <button onClick={httpRequest} className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none">
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
