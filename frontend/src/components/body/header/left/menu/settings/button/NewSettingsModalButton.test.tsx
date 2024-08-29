import {expect, test, describe} from "vitest";
import {NewSettingsModalButton} from "./NewSettingsModalButton";
import {
    act,
    fireEvent,
    render,
    screen,
    userEvent,
    waitFor,
} from "../../../../../../../utils/tests/test-utils";
import {NewSettingsModal} from "../body/NewSettingsModal";
import {handleLocalSettingsUpdates} from "../../../../../../../utils/settings/handleLocalSettingsUpdates";

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
});

describe("should render button", () => {
    test("should render button", () => {
        render(<NewSettingsModalButton menuIsOpened={() => {
        }} />);
        const settingsButton = screen.getByTestId("settings-menu-button");
        expect(settingsButton).toBeInTheDocument();
    });

    test("should trigger on save function", () => {
        const mockOnSave = vi.fn();

        render(
            <NewSettingsModal onSave={mockOnSave} isOpen={true} onClose={() => {
            }} />,
        );

        const saveButton = screen.queryByTestId("save-settings-modal-button");

        if (saveButton === null) {
            throw new Error("Save button is null");
        }
        act(() => {
            fireEvent.click(saveButton);
        });

        expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    test.skip("should trigger on save function - handleLocalSettingsUpdates needs to be called", () => {
        vi.mock("../../../../../../../utils/handleLocalSettingsUpdates", () => ({
            handleLocalSettingsUpdates: vi.fn(() => 1000), // Sie können den Rückgabewert nach Bedarf anpassen
        }));

        render(
            <NewSettingsModal
                onSave={handleLocalSettingsUpdates}
                isOpen={true}
                onClose={() => {
                }}
            />,
        );

        const saveButton = screen.queryByTestId("save-settings-modal-button");

        if (saveButton === null) {
            throw new Error("Save button is null");
        }
        act(() => {
            fireEvent.click(saveButton);
        });

        expect(handleLocalSettingsUpdates).toHaveBeenCalledOnce();
    });

    test.skip("should trigger on save function - handleLocalSettingsUpdates needs to be called with return value", async () => {
        render(<NewSettingsModalButton menuIsOpened={() => {
        }} />);
        const modalButton = screen.getByTestId("settings-menu-button");

        act(() => {
            userEvent.click(modalButton);
        });

        await waitFor(async () => {
            const button = screen.queryByTestId("save-settings-modal-button");
            if (button === null) {
                throw new Error("Modal is null");
            }

            act(() => {
                fireEvent.click(button);
            });

            expect(handleLocalSettingsUpdates).toHaveBeenCalled();
        });
    });
});