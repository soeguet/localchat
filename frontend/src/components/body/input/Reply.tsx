import React, { memo } from "react";
import { useReplyStore } from "../../../stores/replyStore";
import { base64ToUtf8 } from "../../../utils/encoder";

const Reply = memo(() => {
    const replyMessage = useReplyStore((state) => state.replyMessage);
    const setReplyMessage = useReplyStore((state) => state.setReplyMessage);

    if (replyMessage === null) {
        return;
    }
    const decodedMessage = base64ToUtf8(replyMessage.message);

    return (
        <>
            {replyMessage && (
                <div className="flex items-center justify-between rounded-md bg-gray-100 p-2">
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center">
                            <p className="pr-2 text-xs text-gray-600">
                                {replyMessage.time} -
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                                {replyMessage.username}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-800">
                            {decodedMessage}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="ml-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setReplyMessage(null)}
                    >
                        <div className="hover:animate-spin">✖</div>
                    </button>
                </div>
            )}
        </>
    );
});

Reply.displayName = "Reply";

export { Reply };

