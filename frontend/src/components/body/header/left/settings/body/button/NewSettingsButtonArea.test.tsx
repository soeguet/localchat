import { expect, test, describe } from "vitest";
import { NewSettingsButtonArea } from "./NewSettingsButtonArea";
import { render,screen } from "../../../../../../../utils/test-utils";

describe("NewSettingsButtonArea", () => {
    test("should render", () => {
        render(<NewSettingsButtonArea onClose={() => {}} />);
        const area = screen.getByTestId("settings-button-area");
        expect(area).toBeInTheDocument();
    });

    test("click on cancel should trigger onClose", () => {
        const onClose = vi.fn();
        render(<NewSettingsButtonArea onClose={onClose} />);
        const cancel = screen.getByTestId("close-settings-modal-button");
        cancel.click();
        expect(onClose).toHaveBeenCalled();
    });

    test("click on save should trigger onClose", () => {
        const onClose = vi.fn();
        render(<NewSettingsButtonArea onClose={onClose} />);
        const cancel = screen.getByTestId("save-settings-modal-button");
        cancel.click();
        expect(onClose).toHaveBeenCalled();
    });
});
