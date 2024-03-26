import { scrollToBottom } from "../../../utils/functionality";
import ScrollSymbolSvg from "../../svgs/scroll/ScrollSymbolSvg";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";
import useRefStore from "../../../stores/refStore";
import { useCallback, useEffect } from "react";
import { debounce } from "../../../utils/debounce";

function ScrollToBottomButton() {
    // socket state
    const chatBottomRefVisible = useRefStore(
        (state) => state.chatBottomRefVisible
    );
    const setChatBottomRefVisible = useRefStore(
        (state) => state.setChatBottomRefVisible
    );
    const chatContainerRef = useRefStore((state) => state.chatContainerRef);

    const handleScroll = useCallback(
        debounce(() => {
            if (!chatContainerRef) return;
            if (!chatContainerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } =
                chatContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                setChatBottomRefVisible(true);
            } else {
                setChatBottomRefVisible(false);
            }
        }, 250),
        []
    );

    useEffect(() => {
        if (!chatContainerRef) return;
        const element = chatContainerRef.current;
        if (element) {
            element.addEventListener("scroll", handleScroll);

            return () => {
                element.removeEventListener("scroll", handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <>
            {!chatBottomRefVisible && (
                <div className="relative max-h-0 -translate-y-12">
                    <button
                        onClick={async () => {
                            await scrollToBottom();
                            useUnseenMessageCountStore
                                .getState()
                                .resetUnseenMessageCount();
                        }}
                        className="sticky left-full z-50 mr-6 flex size-10 max-w-xs
                    transform animate-bounce items-center justify-center rounded-full border border-black
                    bg-gray-200 text-xs shadow transition duration-300 ease-in-out hover:border-cyan-500"
                    >
                        <ScrollSymbolSvg />
                    </button>
                </div>
            )}
        </>
    );
}

export default ScrollToBottomButton;
