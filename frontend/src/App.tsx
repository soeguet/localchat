import Chat from "./components/body/Chat";
import Form from "./components/startup/Form";
import { useEnvironmentVariablesLoader } from "./hooks/setup/useEnvLoader";
import { useFontSizeInitializer } from "./hooks/setup/useFontSizeInitializer";

/**
 * The main part of the application.
 * Renders all interfaces.
 */
function App() {
    // Load environment variables and check if all set
    const { allEnvVariableSet } = useEnvironmentVariablesLoader();
    // //console.log("allEnvVariableSet", allEnvVariableSet);

    // Load font size and set it globally
    useFontSizeInitializer();

    if (!allEnvVariableSet) {
        return <Form />;
    }
    return <Chat />;
}

export default App;