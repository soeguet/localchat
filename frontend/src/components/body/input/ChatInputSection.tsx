import type React from "react";
import {useCallback, useState} from "react";
import {useTypingHook} from "../../../hooks/input/useTypingHook";
import {useReplyStore} from "../../../stores/replyStore";
import {sendClientMessageToWebsocket} from "../../../utils/socket/socket";
import {ClipButton} from "./buttons/ClipButton";
import {Emoji} from "./emoji/Emoji";
import {Reply} from "./reply/Reply";
import {Image} from "./images/Image";
import {SendButton} from "./buttons/SendButton";
import {TextArea} from "./text-area/TextArea";
import {useImageStore} from "../../../stores/imageStore";
import {DroppedImage} from "./images/DroppedImage";

function ChatInputSection() {
    const {typingTimeoutId, setTypingTimeoutId, sendTypingStatus} =
        useTypingHook();
    const [message, setMessage] = useState("");

    const handleSendMessage = useCallback(async () => {
        const imageSet = useImageStore.getState().selectedImage;
        const droppedImageSet = useImageStore.getState().droppedImage;
        if (!imageSet && !droppedImageSet && message.trim().length === 0) {
            return;
        }
        if (message || imageSet || droppedImageSet) {
            const {replyMessage, setReplyMessage} = useReplyStore.getState();
            await sendClientMessageToWebsocket(message);

            // reset replyMessage state AFTER sending the message. we need that state for the message payload
            if (replyMessage !== null) {
                setReplyMessage(null);
            }
            setMessage("");
        }
    }, [message]);

    const handleKeyDown = useCallback(
        async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                await handleSendMessage();
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
        [typingTimeoutId, message, setTypingTimeoutId, sendTypingStatus, handleSendMessage],
    );

    return (
        <>
            <div className="flex grow-0 items-end gap-2 border-t-2 border-t-black bg-white p-4">
                <div className="mx-1 flex h-full items-center gap-4">
                    <Emoji setMessage={setMessage} />
                    <ClipButton />
                </div>
                <div
                    className="mx-2 my-auto flex flex-1 flex-col gap-2"
                >
                    <Reply />
                    <Image />
                    <DroppedImage />
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