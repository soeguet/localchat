import { expect, test, describe } from "vitest";
import { NewSettingsButtonArea } from "./NewSettingsButtonArea";
import { render, screen } from "../../../../../../../../../utils/tests/test-utils";

describe("NewSettingsButtonArea", () => {
	test("should render", () => {
		render(<NewSettingsButtonArea onSave={() => {}} onClose={() => {}} />);
		const area = screen.getByTestId("settings-button-area");
		expect(area).toBeInTheDocument();
	});

	test("click on cancel should trigger onClose", () => {
		const onClose = vi.fn();
		render(<NewSettingsButtonArea onSave={() => {}} onClose={onClose} />);
		const cancel = screen.getByTestId("close-settings-modal-button");
		cancel.click();
		expect(onClose).toHaveBeenCalled();
	});

	test("click on save should trigger onClose", () => {
		const onSave = vi.fn();
		render(<NewSettingsButtonArea onSave={onSave} onClose={() => {}} />);
		const cancel = screen.getByTestId("save-settings-modal-button");
		cancel.click();
		expect(onSave).toHaveBeenCalled();
	});
});