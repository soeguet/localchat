import { expect, test, describe } from "vitest";
import { render, screen, userEvent } from "../../../../../../utils/test-utils";
import { NewSettingsModal } from "./NewSettingsModal";
import { NewSettingsModalButton } from "./button/NewSettingsModalButton";

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
});

describe("NewSettingsModal", () => {
    test("should render if directly called", () => {
        render(<NewSettingsModal isOpen={true} onClose={() => {}} />);
        const settingsModal = screen.getByTestId("settings-modal");
        expect(settingsModal).toBeInTheDocument();
    });

    test("should not render if not called", () => {
        render(<NewSettingsModalButton />);
        const settingsModal = screen.queryByTestId("settings-modal");
        expect(settingsModal).toBeNull();
    });

    test("should render if button clicked", async () => {
        render(<NewSettingsModalButton />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        await userEvent.click(settingsButton);
        const settingsModal = screen.getByTestId("settings-modal");
        expect(settingsModal).toBeInTheDocument();
    });

    test("should close if button clicked", async () => {
        render(<NewSettingsModalButton />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        await userEvent.click(settingsButton);
        const settingsModal = screen.getByTestId("settings-modal");
        expect(settingsModal).toBeInTheDocument();
        await userEvent.click(
            screen.getByTestId("close-settings-modal-button")
        );
        const settingsModalClosed = screen.queryByTestId("settings-modal");
        expect(settingsModalClosed).toBeNull();
    });
});