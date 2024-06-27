import { useEffect, useState } from "react";
import { Chat } from "./components/body/Chat";
import { Form } from "./components/startup/Form";
import { useFontSizeInitializer } from "./hooks/setup/useFontSizeInitializer";
import { useUserStore } from "./stores/userStore";
import { useInitializeSelectedAppLanguageFromLocalStorage } from "./utils/useLanguageLoader";

/**
 * The main part of the application.
 * Renders all interfaces.
 */
function App() {
	// const { allEnvVariableSet } = useEnvironmentVariablesLoader();
	const [socketVariableAllAvailable, setSocketVariableAllAvailable] =
		useState(false);
	const socketIp = useUserStore((state) => state.socketIp);
	const socketPort = useUserStore((state) => state.socketPort);
	const username = useUserStore((state) => state.myUsername);

	useEffect(() => {
		if (!!socketIp && !!socketPort && !!username) {
			setSocketVariableAllAvailable(true);
			return;
		}

		setSocketVariableAllAvailable(false);
	}, [socketIp, socketPort, username]);

	useInitializeSelectedAppLanguageFromLocalStorage();

	useFontSizeInitializer();

	if (!socketVariableAllAvailable) {
		return <Form />;
		// return <div>Loading...</div>;
	}
	return <Chat />;
}

export { App };