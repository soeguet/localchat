import { Chat } from "./components/body/Chat";
import { Form } from "./components/startup/Form";
import { useFontSizeInitializer } from "./hooks/setup/useFontSizeInitializer";
import { useUserEnvChecker } from "./hooks/useUserEnvChecker";
import { useInitializeSelectedAppLanguageFromLocalStorage } from "./utils/useLanguageLoader";

/**
 * The main part of the application.
 * Renders all interfaces.
 */
function App() {
	const socketVariableAllAvailable = useUserEnvChecker();
	useInitializeSelectedAppLanguageFromLocalStorage();
	useFontSizeInitializer();

	if (!socketVariableAllAvailable) {
		return <Form />;
	}
	return <Chat />;
}
export { App };