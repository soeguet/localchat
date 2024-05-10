import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../utils/test-utils";
import { NewSettingsModalButton } from "./NewSettingsModalButton";

describe("should render button", () => {
    test("should render button", () => {
        render(<NewSettingsModalButton />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        expect(settingsButton).toBeInTheDocument();
    });
});
