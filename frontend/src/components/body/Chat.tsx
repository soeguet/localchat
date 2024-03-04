import ChatInputSection from "../ChatInputSection";
import TypingIndicator from "../TypingIndicator";
import Header from "../Header";
import { RegisteredUser } from "../../utils/customTypes";
import useUserStore from "../../stores/userStore";
import useClientStore from "../../stores/clientsStore";
import ChatPanel from "./panel/ChatPanel";
import ClientNotFoundPage from "./ClientNotFoundPage";
import useConnection from "../../hooks/socket/connection";
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

    // custom hook for websocket connection
    useConnection();

    useWindowFocussedListener();

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
