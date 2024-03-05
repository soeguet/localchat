import {scrollToBottom} from "../../../utils/functionality";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import ScrollSymbolSvg from "../../svgs/scroll/ScrollSymbolSvg";
import React from "react";

type ScrollToBottomButtonProps = {
    chatBottomRefVisible: boolean
}

function ScrollToBottomButton({chatBottomRefVisible}: ScrollToBottomButtonProps) {

    return (
        <>

            {!chatBottomRefVisible && (
                <button
                    onClick={async () => {
                        await scrollToBottom();
                        useUnseenMessageCountStore
                            .getState()
                            .resetUnseenMessageCount();
                    }}
                    className="fixed bottom-24 right-0 z-50 mb-3 mr-5 flex size-10 max-w-xs -translate-x-1/2 transform animate-bounce items-center justify-center rounded-full border border-black bg-gray-200 text-xs shadow transition duration-300 ease-in-out hover:border-cyan-500"
                >
                    <ScrollSymbolSvg/>
                </button>
            )
            }
        </>
    );
}

export default ScrollToBottomButton;