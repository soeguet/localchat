import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useTypingHook } from "../../../hooks/input/useTypingHook";

function TextArea({
    setMessage,
    handleSendMessage,
}: {
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
}) {
    const { t } = useTranslation();
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const {typingTimeoutId, setTypingTimeoutId, sendTypingStatus} = useTypingHook();

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (textAreaRef === null || textAreaRef === undefined) {
                throw new Error("textAreaRef is null or undefined");
            }

            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
                sendTypingStatus(false);
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                    setTypingTimeoutId(null);
                }
            } else {
                // sends status
                if (textAreaRef.current?.value.length === 0 || !typingTimeoutId) {
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
        [typingTimeoutId, handleSendMessage, sendTypingStatus]
    );
    return (
        <>
            <textarea
                ref={textAreaRef}
                className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("chat_input_placeholder")}
                rows={2}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            ></textarea>
        </>
    );
}

export default TextArea;
