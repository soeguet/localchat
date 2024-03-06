import Chat from "./components/body/Chat";
import Form from "./components/startup/Form";
import { useEnvironmentVariablesLoader } from "./hooks/setup/useEnvLoader";
import { useFontSizeInitializer } from "./hooks/setup/useFontSizeInitializer";
import { initializeSelectedAppLanguageFromLocalStorage } from "./utils/languageLoader";

/**
 * The main part of the application.
 * Renders all interfaces.
 */
function App() {
    const { allEnvVariableSet } = useEnvironmentVariablesLoader();

    initializeSelectedAppLanguageFromLocalStorage();

    useFontSizeInitializer();

    if (!allEnvVariableSet) {
        return <Form />;
    }
    return <Chat />;
}

export default App;