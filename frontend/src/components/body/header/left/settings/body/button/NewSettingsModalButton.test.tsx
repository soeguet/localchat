import { expect, test, describe } from "vitest";
import { NewSettingsModalButton } from "./NewSettingsModalButton";
import { render, screen } from "../../../../../../../utils/test-utils";

describe("should render button", () => {
    test("should render button", () => {
        render(<NewSettingsModalButton />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        expect(settingsButton).toBeInTheDocument();
    });
});
