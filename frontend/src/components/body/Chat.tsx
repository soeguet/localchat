import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import { useClientChecker } from "../../hooks/chat/useClientChecker";
import { useWebsocketConnection } from "../../hooks/socket/useWebsocketConnection";
import { ClientNotFoundPage } from "../error/ClientNotFoundPage";
import BannerComponent from "./banner/BannerComponent";
import { DevmodeBanner } from "./devmode/DevmodeBanner";
import { EmergencyContainer } from "./emergency/EmergencyContainer";
import { Header } from "./header/Header";
import { ChatInputSection } from "./input/ChatInputSection";
import { ChatPanel } from "./panel/ChatPanel";
import { ReactionModal } from "./reaction/ReactionModal";
import { ScrollToBottomButton } from "./scroll/ScrollToBottomButton";
import { TypingIndicator } from "./typing/TypingIndicator";
import { UpdateBanner } from "./update/UpdateBanner";

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
				className="relative flex h-screen flex-col justify-evenly">
				<Header />
				<UpdateBanner />
				<DevmodeBanner />
				<BannerComponent />
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