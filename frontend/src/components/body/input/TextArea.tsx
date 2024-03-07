import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";
import useReplyStore from "../../../stores/replyStore";

type TextAreaProps = {
    message: string;
    setMessage: (message: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const TextArea = (props: TextAreaProps) => {
    const { t } = useTranslation();

    const replyMessage = useReplyStore((state) => state.replyMessage);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null); // Setze den Ref-Typen explizit

    useEffect(() => {
        if (replyMessage) {
            textAreaRef.current?.focus();
        }
    }, [replyMessage]);

    //console.log("TextArea rendered");
    return (
        <>
            <textarea
                className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("chat_input_placeholder")}
                ref={textAreaRef}
                rows={2}
                value={props.message}
                onChange={(e) => {
                    props.setMessage(e.target.value);
                }}
                onKeyDown={props.handleKeyDown}
            ></textarea>
        </>
    );
};

TextArea.displayName = "TextArea";

export default TextArea;
