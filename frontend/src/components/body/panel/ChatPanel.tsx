import {useCallback, useEffect, useRef} from "react";
import useChatBottomRefVisibleStore from "../../../stores/chatBottomRefVisibleStore";
import ScrollToBottomButton from "./ScrollToBottomButton";
import MessageRenderMap from "./MessageRenderMap";
import {debounce} from "../../../utils/debounce";
import TypingIndicator from "./TypingIndicator";

function ChatPanel() {
    // socket state
    const {chatBottomRefVisible, setChatBottomRefVisible, setChatBottomRef} =
        useChatBottomRefVisibleStore();

    //console.log("CHATPANEL RENDER");
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChatBottomRef(chatBottomRef);
    }, []);

    const handleScroll = useCallback(
        debounce(() => {
            if (!chatContainerRef.current) return;

            const {scrollTop, scrollHeight, clientHeight} =
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
            <div
                ref={chatContainerRef}
                className={"relative grow overflow-y-auto px-5 pb-2 pt-2"}
            >
                <MessageRenderMap/>
                <ScrollToBottomButton
                    chatBottomRefVisible={chatBottomRefVisible}
                />
                <TypingIndicator/>
                <div ref={chatBottomRef}/>
            </div>
        </>
    );
}

export default ChatPanel;