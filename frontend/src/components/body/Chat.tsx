import ChatInputSection from "../ChatInputSection";
import TypingIndicator from "../TypingIndicator";
import Header from "../Header";
import { RegisteredUser } from "../../utils/customTypes";
import useUserStore from "../../stores/userStore";
import useClientStore from "../../stores/clientsStore";
import ChatPanel from "./panel/ChatPanel";
import ClientNotFoundPage from "./ClientNotFoundPage";
import useConnection from "../../hooks/socket/connection";
import { useEffect, useRef } from "react";
import useGuiHasFocusStore from "../../stores/guiHasFocusStore";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    // custom hook for websocket connection
    useConnection();

    const guiHasFocus = useRef(true);
    useEffect(() => {
        const handleFocus = () => {
            //console.log("GUI now has focus");
            useGuiHasFocusStore.getState().setGuiHasFocus(true);
            guiHasFocus.current = true;
        };

        const handleBlur = () => {
            useGuiHasFocusStore.getState().setGuiHasFocus(false);
            //console.log("GUI lost focus");
            guiHasFocus.current = false;
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    // this client state
    const clientId = useUserStore((state) => state.myId);
    const thisClient: RegisteredUser | undefined = useClientStore((state) =>
        state.clients.find((c) => c.id === clientId)
    );

    if (thisClient === undefined) {
        return <ClientNotFoundPage />;
    }

    return (
        <>
            <div className="flex flex-col h-screen justify-evenly">
                <Header />
                <ChatPanel />
                <TypingIndicator />
                <ChatInputSection />
            </div>
        </>
    );
}

export default App;
