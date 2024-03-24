import React from "react";
import {useTranslation} from "react-i18next";

type SendButtonProps = {
    handleSendMessage: () => void;
    sendTypingStatus: (status: boolean) => void;
};

function SendButton({handleSendMessage, sendTypingStatus}: SendButtonProps) {
    const {t} = useTranslation();
    return (
        <button
            className="my-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            onClick={() => {
                handleSendMessage();
                sendTypingStatus(false);
            }}
        >
            {t("button_send")}
        </button>
    );
}

export default React.memo(SendButton);
