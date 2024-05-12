import { expect, test, describe } from "vitest";
import { render, screen, userEvent } from "../../../../../../utils/test-utils";
import { NewSettingsModalContainer } from "./NewSettingsModalContainer";
import { NewSettingsModalButton } from "./button/NewSettingsModalButton";

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
});
describe("NewSettingsModalContainer", () => {
    test("should render component", () => {
        render(<NewSettingsModalContainer onClose={() => {}} />);
        const container = screen.getByTestId("settings-modal-container");
        expect(container).toBeInTheDocument();
    });

    test("should close on button click", async () => {
        const onClose = vi.fn();
        render(<NewSettingsModalContainer onClose={onClose} />);
        const closeButton = screen.getByTestId("close-settings-modal-button");
        await userEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("should close modal if parent is rendered and close button is clicked", async () => {
        render(<NewSettingsModalButton />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        await userEvent.click(settingsButton);

        const closeSettingsButton = screen.getByTestId(
            "close-settings-modal-button"
        );
        await userEvent.click(closeSettingsButton);

        const settingsModal = screen.queryByTestId("settings-modal");

        expect(settingsModal).toBeNull();
    });
});
