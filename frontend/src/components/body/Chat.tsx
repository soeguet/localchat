import { useClientChecker } from "../../hooks/useClientChecker";
import { ChatInputSection } from "./input/ChatInputSection";
import { Header } from "./header/Header";
import { ChatPanel } from "./panel/ChatPanel";
import { ClientNotFoundPage } from "../error/ClientNotFoundPage";
import { useWebsocketConnection } from "../../hooks/socket/useWebsocketConnection";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import { TypingIndicator } from "./panel/TypingIndicator";
import { ScrollToBottomButton } from "./panel/ScrollToBottomButton";
import { EmergencyContainer } from "./emergency/EmergencyContainer";
import { ReactionModal } from "./ReactionModal";

/**
 * The main part of the application.
 * Renders the chat interface and handles message handling and sending.
 */
function Chat() {
	useWebsocketConnection();
	useWindowFocussedListener();

	const clientChecker = useClientChecker();
	if (!clientChecker) {
		return <ClientNotFoundPage />;
	}

	return (
		<>
			<main
				data-testid="chat-main"
				className="relative flex h-screen flex-col justify-evenly"
			>
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
