import { useTranslation } from "react-i18next";

type TextAreaProps = {
    message: string;
    setMessage: (message: string) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const TextArea = (props: TextAreaProps) => {
    const { t } = useTranslation();

    console.log("TextArea rendered");
    return (
        <>
            <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("chat_input_placeholder")}
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
