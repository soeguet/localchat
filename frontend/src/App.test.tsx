import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./components/body/Chat", () => {
    return { default: () => <div>Mocked Chat</div> };
});

vi.mock("./components/startup/Form", () => {
    return { default: () => <div>Form Component</div> };
});

describe("App.tsx", () => {

    it.skip("should render Form component if all environment variables are not set", () => {
        vi.mock("./hooks/setup/useEnvLoader.ts", () => ({
            useEnvironmentVariablesLoader: () => ({ allEnvVariableSet: false }),
        }));

        render(<App />);
        expect(screen.getByText(/form component/i)).toBeInTheDocument();
    });

    it("should render Mocked Chat component if all environment variables are set", () => {
        // Mock für useEnvironmentVariablesLoader
        vi.mock("./hooks/setup/useEnvLoader", () => ({
            useEnvironmentVariablesLoader: () => ({ allEnvVariableSet: true }),
        }));

        render(<App />);
        expect(screen.getByText(/mocked chat/i)).toBeInTheDocument(); // Bestätigt, dass der gemockte Chat gerendert wird
    });
});