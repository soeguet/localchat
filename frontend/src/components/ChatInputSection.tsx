import { useCallback, useState } from "react";
import Emoji from "./Emoji";
import Reply from "./Reply";
import useReplyStore from "../stores/replyStore";
import { InputProps } from "../utils/customTypes";
import { useTranslation } from "react-i18next";
import { WindowMinimise, WindowShow, WindowUnminimise } from "../../wailsjs/runtime";
import TextArea from "./body/input/TextArea";

function ChatInputSection(inputProps: InputProps) {
    const [message, setMessage] = useState("");
    const { t } = useTranslation();

    const handleSendMessage = useCallback(() => {
        console.log("Message sent:", message);
        if (message.trim()) {
            const { replyMessage, setReplyMessage } = useReplyStore.getState();

            inputProps.sendClientMessageToWebsocket(message);

            // reset replyMessage state AFTER sending the message. we need that state for the message payload
            if (replyMessage !== null) {
                setReplyMessage(null);
            }
            setMessage("");
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
        <div className="flex items-end gap-2 bg-white p-4 border-t-2 border-t-black">
            <Emoji message={message} setMessage={setMessage} />
            <button
                onClick={handleClipClick}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <i className="far fa-paperclip">📎</i>
            </button>
            <div className="flex-1 mx-2 my-auto flex flex-col gap-2">
                <Reply />
                <TextArea setMessage={setMessage} handleSendMessage={handleSendMessage} />
            </div>
            <button
                className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                onClick={() => handleSendMessage()}
            >
                {t("button_send")}
            </button>
        </div>
    );
}

export default ChatInputSection;
