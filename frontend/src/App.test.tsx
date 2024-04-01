import {vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {App} from "./App";
import {Chat} from "./components/body/Chat";
import {Form} from "./components/startup/Form";

import * as fontsize from "./hooks/setup/useFontSizeInitializer";
import * as language from "./utils/useLanguageLoader";
import * as envLoader from "./hooks/setup/useEnvLoader";

vi.mock("./components/body/Chat", () =>{

    const Chat = vi.fn(() => {
        return <div>Chat Component</div>;
    });

    return {Chat};
});

vi.mock("./components/startup/Form", () =>{

    const Form = vi.fn(() => {
        return <div>Form Component</div>;
    });

    return {Form};
});

vi.spyOn(fontsize, "useFontSizeInitializer").mockImplementation(() => {
});
vi.spyOn(
    language,
    "useInitializeSelectedAppLanguageFromLocalStorage"
).mockImplementation(() => {
});

describe("App.tsx", () => {
    it("should render Form component if all environment variables are not set", () => {
        vi.spyOn(envLoader, "useEnvironmentVariablesLoader").mockImplementation(
            () => ({allEnvVariableSet: false})
        );

        render(<App/>);
        expect(screen.getByText(/form component/i)).toBeInTheDocument();
    });

    it("should render Mocked Chat component if all environment variables are set", () => {
        vi.spyOn(envLoader, "useEnvironmentVariablesLoader").mockImplementation(
            () => ({allEnvVariableSet: true})
        );

        render(<App/>);
        expect(screen.getByText(/chat component/i)).toBeInTheDocument();
    });
});