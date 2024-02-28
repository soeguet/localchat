import ChatInputSection from "../ChatInputSection";
import TypingIndicator from "../TypingIndicator";
import Header from "../Header";
import { sendClientMessageToWebsocket } from "../../utils/socket";
import { RegisteredUser } from "../../utils/customTypes";
import useUserStore from "../../stores/userStore";
import useClientStore from "../../stores/clientsStore";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import ChatPanel from "./panel/ChatPanel";
import ClientNotFoundPage from "./ClientNotFoundPage";
import useConnection from "../../hooks/socket/connection";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function App() {

    // custom hook for websocket connection
    useConnection();

    const guiHasFocus = useWindowFocussedListener();
    console.log("guiHasFocus", guiHasFocus);

    // this client state
    const clientId = useUserStore((state) => state.myId);
    const thisClient: RegisteredUser | undefined = useClientStore((state) =>
        state.clients.find((c) => c.id === clientId)
    );

    if (thisClient === undefined) {
        <ClientNotFoundPage />;
    }

    return (
        <>
            <div className="flex h-screen flex-col justify-evenly">
                <Header />
                <ChatPanel />
                <TypingIndicator />
                <div className="grow-0">
                    <ChatInputSection sendClientMessageToWebsocket={sendClientMessageToWebsocket} />
                </div>
            </div>
        </>
    );
}

export default App;
