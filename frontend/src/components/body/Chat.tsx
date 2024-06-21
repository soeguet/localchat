import { ChatInputSection } from "./input/ChatInputSection";
import { Header } from "./header/Header";
import { useUserStore } from "../../stores/userStore";
import { useClientStore } from "../../stores/clientStore";
import { ChatPanel } from "./panel/ChatPanel";
import { ClientNotFoundPage } from "../error/ClientNotFoundPage";
import { useWebsocketConnection } from "../../hooks/socket/useWebsocketConnection";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import { TypingIndicator } from "./panel/TypingIndicator";
import { ScrollToBottomButton } from "./panel/ScrollToBottomButton";
import ReactionModal from "./ReactionModal";
import { EmergencyContainer } from "./emergency/EmergencyContainer";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function Chat() {
	// this client state
	const clientDbId = useUserStore((state) => state.myId);
	const thisClient = useClientStore((state) =>
		state.clients.find((c) => c.clientDbId === clientDbId),
	);

	useWebsocketConnection();

	useWindowFocussedListener();

	if (thisClient === undefined) {
		return <ClientNotFoundPage />;
	}
	console.log("Chat.tsx");

	return (
		<>
			<main
				data-testid="chat-main"
				className="relative flex h-screen flex-col justify-evenly">
				<Header />
				<ChatPanel />
				<TypingIndicator />
				<ScrollToBottomButton />
				<ChatInputSection />
				<ReactionModal />
				<EmergencyContainer />
			</main>
		</>
	);
}

export { Chat };
