import ChatInputSection from "./input/ChatInputSection";
import TypingIndicator from "./panel/TypingIndicator";
import Header from "./header/Header";
import { RegisteredUser } from "../../utils/customTypes";
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
    const clientId = useUserStore((state) => state.myId);
    const thisClient: RegisteredUser | undefined = useClientStore((state) =>
        state.clients.find((c) => c.id === clientId)
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
                <TypingIndicator />
                <ChatInputSection />
            </div>
        </>
    );
}

export default App;
