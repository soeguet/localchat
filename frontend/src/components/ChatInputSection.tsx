import {useCallback, useRef, useState} from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";
import useReplyStore from "../stores/replyStore";
import {useTranslation} from "react-i18next";
import {WindowMinimise, WindowShow, WindowUnminimise} from "../../wailsjs/runtime";
import TextArea from "./body/input/TextArea";
import {sendClientMessageToWebsocket} from "../utils/socket";

function ChatInputSection() {
    const {t} = useTranslation();
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSendMessage = useCallback(() => {
        // console.log("Message sent:", message);
        if (message.trim()) {
            const {replyMessage, setReplyMessage} = useReplyStore.getState();

            sendClientMessageToWebsocket(message);

            // reset replyMessage state AFTER sending the message. we need that state for the message payload
            if (replyMessage !== null) {
                setReplyMessage(null);
            }
            setMessage("");
            textareaRef.current!.value = "";
        }
    }, []);

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
        <>
            <div className="grow-0">
                <div className="flex items-end gap-2 border-t-2 border-t-black bg-white p-4">
                    <Emoji message={message} setMessage={setMessage} />
                    <button
                        onClick={handleClipClick}
                        className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <i className="far fa-paperclip">📎</i>
                    </button>
                    <div className="mx-2 my-auto flex flex-1 flex-col gap-2">
                        <Reply />
                        <TextArea setMessage={setMessage} handleSendMessage={handleSendMessage} ref={textareaRef} />
                    </div>
                    <button
                        className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                        onClick={() => handleSendMessage()}
                    >
                        {t("button_send")}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatInputSection;