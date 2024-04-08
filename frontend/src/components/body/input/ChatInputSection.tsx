import React, {useCallback, useState} from "react";
import {Emoji} from "./Emoji";
import {Reply} from "./Reply";
import {useReplyStore} from "../../../stores/replyStore";
import {TextArea} from "./TextArea";
import {sendClientMessageToWebsocket} from "../../../utils/socket";
import {ClipButton} from "./ClipButton";
import {SendButton} from "./SendButton";
import {useTypingHook} from "../../../hooks/input/useTypingHook";

function ChatInputSection() {
    const {typingTimeoutId, setTypingTimeoutId, sendTypingStatus} =
        useTypingHook();
    const [message, setMessage] = useState("");

    const handleSendMessage = useCallback(() => {
        if (message.trim().length == 0) {
            return;
        }
        if (message) {
            const {replyMessage, setReplyMessage} = useReplyStore.getState();
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
            <div className="flex grow-0 items-end gap-2 border-t-2 border-t-black bg-white p-4">
                <Emoji setMessage={setMessage}/>
                <ClipButton/>
                <div className="mx-2 my-auto flex flex-1 flex-col gap-2">
                    <Reply/>
                    <TextArea
                        message={message}
                        setMessage={setMessage}
                        handleKeyDown={handleKeyDown}
                    />
                </div>
                <SendButton
                    handleSendMessage={handleSendMessage}
                    sendTypingStatus={sendTypingStatus}
                />
            </div>
        </>
    );
}

export {ChatInputSection};