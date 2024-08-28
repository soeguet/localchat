import { useClientChecker } from "../../hooks/useClientChecker";
import { ChatInputSection } from "./input/ChatInputSection";
import { Header } from "./header/Header";
import { ChatPanel } from "./panel/ChatPanel";
import { ClientNotFoundPage } from "../error/ClientNotFoundPage";
import { useWebsocketConnection } from "../../hooks/socket/useWebsocketConnection";
import { useWindowFocussedListener } from "../../hooks/body/useWindowFocussedListener";
import { TypingIndicator } from "./typing/TypingIndicator";
import { ScrollToBottomButton } from "./scroll/ScrollToBottomButton";
import { EmergencyContainer } from "./emergency/EmergencyContainer";
import { ReactionModal } from "./reaction/ReactionModal";
import {UpdateBanner} from "./update/UpdateBanner";
import {DevmodeBanner} from "./devmode/DevmodeBanner";
import BannerComponent from "./banner/BannerComponent";

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