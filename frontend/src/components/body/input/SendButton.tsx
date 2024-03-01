import { t } from "i18next";
import React from "react";

type SendButtonProps = {
    handleSendMessage: () => void;
    sendTypingStatus: (status: boolean) => void;
};

function SendButton({ handleSendMessage, sendTypingStatus }: SendButtonProps) {
    return (
        <button
            className="px-4 py-2 my-auto text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
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
