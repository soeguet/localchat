import React, {useCallback, useState} from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";
import useReplyStore from "../stores/replyStore";
import useUserStore from "../stores/userStore";
import {InputProps, PayloadSubType} from "../utils/customTypes";
import useWebsocketStore from "../stores/websocketStore";
import {useTranslation} from "react-i18next";
import {WindowMinimise, WindowShow, WindowUnminimise} from "../../wailsjs/runtime";

function ChatInputSection(inputProps: InputProps) {
    const {t} = useTranslation();
    const [message, setMessage] = useState("");

    const clientId = useUserStore((state) => state.myId);
    const websocket: WebSocket | null = useWebsocketStore((state) => state.ws);

    const [typingTimeoutId, setTypingTimeoutId] = useState<number | null>(null);

    const sendTypingStatus = useCallback((isTyping: boolean) => {
        if (websocket !== null) {
            websocket.send(
                JSON.stringify({
                    payloadType: PayloadSubType.typing,
                    clientId: clientId,
                    isTyping: isTyping,
                })
            );
        }
    }, []);

    const handleSendMessage = useCallback((message: string) => {
        console.log("Message sent:", message);
        if (message.trim()) {
            const {replyMessage, setReplyMessage} = useReplyStore.getState();

            inputProps.sendClientMessageToWebsocket(message);

            // reset replyMessage state AFTER sending the message. we need that state for the message payload
            if (replyMessage !== null) {
                setReplyMessage(null);
            }
            setMessage("");
        }
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(message);
                sendTypingStatus(false);
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                    setTypingTimeoutId(null);
                }
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
        [message, typingTimeoutId, handleSendMessage, sendTypingStatus]
    );

    function handleClipClick() {
        console.log("Clip clicked");
        setTimeout(() => {
            //MakeWindowsTaskIconFlash("localchat");
            setTimeout(() => {
                WindowUnminimise();
            }, 1000);
            WindowMinimise();
            WindowShow();
        }, 3000);
    }

    return (
        <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-4">
            <Emoji message={message} setMessage={setMessage} />
            <button onClick={handleClipClick}
                    className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="far fa-paperclip">📎</i>
            </button>
            <div className="flex-1 mx-2 my-auto flex flex-col gap-2">
                <Reply />
                <textarea
                    className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("chat_input_placeholder")}
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                ></textarea>
            </div>
            <button
                className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                onClick={() => handleSendMessage(message)}
            >
                {t("button_send")}
            </button>
        </div>
    );
}

export default ChatInputSection;