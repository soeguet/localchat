import { useCallback, useState } from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";
import useReplyStore from "../stores/replyStore";
import TextArea from "./body/input/TextArea";
import { sendClientMessageToWebsocket } from "../utils/socket";
import ClipButton from "./body/input/ClipButton";
import SendButton from "./body/input/SendButton";
import { useTypingHook } from "../hooks/input/useTypingHook";

function ChatInputSection() {
    const { typingTimeoutId, setTypingTimeoutId, sendTypingStatus } = useTypingHook();
    const [message, setMessage] = useState("");

    const handleSendMessage = useCallback(() => {
        //console.log("Message sent:", message);
        if(message.trim().length == 0) {
            return;
        }
        if (message) {
            const { replyMessage, setReplyMessage } = useReplyStore.getState();
            sendClientMessageToWebsocket(message);

            // reset replyMessage state AFTER sending the message. we need that state for the message payload
            if (replyMessage !== null) {
                setReplyMessage(null);
            }
            setMessage("");
        }
    }, [message]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
                sendTypingStatus(false);
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                    setTypingTimeoutId(null);
                }

                setMessage("");
            } else {
                // sends status
                if (message.length === 0 || !typingTimeoutId) {
                    sendTypingStatus(true);
                }

                // reset timer if one is present
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                }

                // start a new timer
                const id = window.setTimeout(() => {
                    sendTypingStatus(false);
                    setTypingTimeoutId(null);
                }, 2500);
                setTypingTimeoutId(id);
            }
        },
        [typingTimeoutId, message]
    );

    return (
        <>
            <div className="flex items-end gap-2 p-4 bg-white border-t-2 grow-0 border-t-black">
                <Emoji setMessage={setMessage} />
                <ClipButton />
                <div className="flex flex-col flex-1 gap-2 mx-2 my-auto">
                    <Reply />
                    <TextArea message={message} setMessage={setMessage} handleKeyDown={handleKeyDown} />
                </div>
                <SendButton handleSendMessage={handleSendMessage} sendTypingStatus={sendTypingStatus} />
            </div>
        </>
    );
}

export default ChatInputSection;
