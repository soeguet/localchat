import ChatInputSection from "./input/ChatInputSection";
import TypingIndicator from "./panel/TypingIndicator";
import Header from "./header/Header";
import useUserStore from "../../stores/userStore";
import useClientStore from "../../stores/clientStore";
import ChatPanel from "./panel/ChatPanel";
import ClientNotFoundPage from "../error/ClientNotFoundPage";
import useWebsocketConnection from "../../hooks/socket/useWebsocketConnection";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    // this client state
    const clientDbId = useUserStore((state) => state.myId);
    const thisClient = useClientStore((state) =>
        state.clients.find((c) => c.clientDbId === clientDbId)
    );

    useWebsocketConnection();

    useWindowFocussedListener();

    if (thisClient === undefined) {
        return <ClientNotFoundPage />;
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header />
                <ChatPanel />
                <ChatInputSection />
            </div>
        </>
    );
}

export default App;