import { render, userEvent } from "../../../../../../utils/tests/test-utils";
import { NewSettingsModalContainer } from "../body/NewSettingsModalContainer";
import { SettingsColorPicker } from "./SettingsColorPicker";
import { act, screen } from "@testing-library/react";
import useSettingsStore from "../../../../../../stores/settingsStore";

describe("SettingsColorPicker", () => {
	test("it should render the color picker", () => {
		// To be implemented
		render(<SettingsColorPicker />);
		const container = screen.queryByTestId(
			"settings-profile-color-picker-container",
		);
		expect(container).toBeInTheDocument();
	});

	test("should change the color of the whole modal - only state!", async () => {
		// To be implemented
		render(<NewSettingsModalContainer onClose={() => {}} onSave={() => {}} />);

		act(() => {
			useSettingsStore.getState().setLocalColor("red");
		});

		const colorInStore = useSettingsStore.getState().localColor;

		expect(colorInStore).toBe("red");

		const modal = screen.queryByTestId("settings-modal-container");

		if (!modal) {
			throw new Error("Modal not found");
		}

		userEvent.hover(modal);

		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		await delay(500);

		expect(modal).toHaveStyle("border-color: red");
	});

	test("should change the color of the whole modal - colorpicker change", async () => {
		// To be implemented
		render(<NewSettingsModalContainer onClose={() => {}} onSave={() => {}} />);
		const colorPicker = screen.queryByTestId("settings-profile-color-picker");

		if (!colorPicker) {
			throw new Error("Color picker not found");
		}

		act(() => {
			useSettingsStore.getState().setLocalColor("red");
		});

		const colorInStore = useSettingsStore.getState().localColor;

		expect(colorInStore).toBe("red");

		const modal = screen.queryByTestId("settings-modal-container");

		if (!modal) {
			throw new Error("Modal not found");
		}

		userEvent.hover(modal);

		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		await delay(500);

		expect(modal).toHaveStyle("border-color: red");
	});
});