import {forwardRef, useCallback, LegacyRef} from "react";
import {useTranslation} from "react-i18next";
import {useTypingHook} from "../../../hooks/input/useTypingHook";

type TextAreaProps = {
    setMessage: (message: string) => void;
    handleSendMessage: () => void;
};

const TextArea = forwardRef((props:TextAreaProps, ref: LegacyRef<HTMLTextAreaElement>)=> {
    const {t} = useTranslation();

    const {typingTimeoutId, setTypingTimeoutId, sendTypingStatus} = useTypingHook();

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (ref === null || ref === undefined) {
                throw new Error("ref is null or undefined");
            }

            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                props.handleSendMessage();
                sendTypingStatus(false);
                if (typingTimeoutId) {
                    clearTimeout(typingTimeoutId);
                    setTypingTimeoutId(null);
                }

                // ref.current!.value = "";

            } else {
                // sends status
                // if (ref.current!.value.length === 0 || !typingTimeoutId) {
                //     sendTypingStatus(true);
                // }

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
        [typingTimeoutId, props.handleSendMessage, sendTypingStatus]
    );
    return (
        <>
            <textarea
                ref={ref}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("chat_input_placeholder")}
                rows={2}
                onChange={(e) => {
                    props.setMessage(e.target.value);
                }}
                onKeyDown={(e) => handleKeyDown(e)}
            ></textarea>
        </>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;