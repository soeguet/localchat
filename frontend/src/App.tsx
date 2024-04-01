import { Chat } from "./components/body/Chat";
import { Form } from "./components/startup/Form";
import {useEnvironmentVariablesLoader} from "./hooks/setup/useEnvLoader";
import {useFontSizeInitializer} from "./hooks/setup/useFontSizeInitializer";
import {useInitializeSelectedAppLanguageFromLocalStorage} from "./utils/useLanguageLoader";

/**
 * The main part of the application.
 * Renders all interfaces.
 */
function App() {
    const {allEnvVariableSet} = useEnvironmentVariablesLoader();

    useInitializeSelectedAppLanguageFromLocalStorage();

    useFontSizeInitializer();

    if (!allEnvVariableSet) {
        return <Form/>;
    }
    return <Chat/>;
}

export {App};