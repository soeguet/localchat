import ChatInputSection from "./input/ChatInputSection";
import TypingIndicator from "./panel/TypingIndicator";
import Header from "./header/Header";
import useUserStore from "../../stores/userStore";
import useClientStore from "../../stores/clientStore";
import ChatPanel from "./panel/ChatPanel";
import ClientNotFoundPage from "../error/ClientNotFoundPage";
import useWebsocketConnection from "../../hooks/socket/useWebsocketConnection";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import { ClientEntity } from "../../utils/customTypes";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {
    // this client state
    const clientId = useUserStore((state) => state.myId);
    const thisClient: ClientEntity | undefined = useClientStore((state) =>
        state.clients.find((c) => c.clientId === clientId)
    );

    console.log("thisClient");
    console.log(clientId);
    console.table(thisClient);

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
