import { scrollToBottom } from "../../../utils/functionality";
import ScrollSymbolSvg from "../../svgs/scroll/ScrollSymbolSvg";

type ScrollToBottomButtonProps = {
    chatBottomRefVisible: boolean;
};

function ScrollToBottomButton({
    chatBottomRefVisible,
}: ScrollToBottomButtonProps) {
    return (
        <>
            {!chatBottomRefVisible && (
                <button
                    onClick={async () => {
                        await scrollToBottom();
                        // useUnseenMessageCountStore
                        //     .getState()
                        //     .resetUnseenMessageCount();
                    }}
                    className="sticky bottom-0 left-full z-50 flex size-10 max-w-xs
                    transform animate-bounce items-center justify-center rounded-full border border-black
                    bg-gray-200 text-xs shadow transition duration-300 ease-in-out hover:border-cyan-500"
                >
                    <ScrollSymbolSvg />
                </button>
            )}
        </>
    );
}

export default ScrollToBottomButton;