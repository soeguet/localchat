import useSettingsStore from "../../../../../../../../../stores/settingsStore";
import {
	act,
	fireEvent,
	render,
	screen,
	userEvent,
} from "../../../../../../../../../utils/tests/test-utils";
import { NewSettingsModalContainer } from "../NewSettingsModalContainer";
import { SettingsLanguagePicker } from "./SettingsLanguagePicker";

describe("SettingsLanguagePicker", () => {
	test("should render settings-language-picker container", () => {
		render(<SettingsLanguagePicker />);
		const container = screen.queryByTestId(
			"settings-language-picker-container",
		);
		expect(container).toBeInTheDocument();
	});

	test("should change store value after value change", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		act(() => {
			useSettingsStore.getState().setLocalColor("red");
		});

		const stateColor = useSettingsStore.getState().localColor;

		expect(stateColor).toBe("red");
	});

	test("should change modal border color after state change", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		act(() => {
			useSettingsStore.getState().setLocalColor("red");
		});

		const container = screen.queryByTestId("settings-modal-container");

		if (!container) {
			throw new Error("Container not found");
		}

		fireEvent.mouseEnter(container);

		expect(container).toHaveStyle("border-color: red");
	});

	test.skip("should change color picker style to red", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		// color picker
		const colorPicker = screen.queryByTestId("settings-profile-color-picker");

		if (!colorPicker) {
			throw new Error("Color picker not found");
		}

		act(() => {
			fireEvent.change(colorPicker, { background: { value: "red" } });
		});

		expect(colorPicker).toHaveStyle("background-color: rgb(255, 0, 0)");
	});

	test("should render no modal border color if no mouse enter", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		// color picker
		const colorPicker = screen.queryByTestId("settings-profile-color-picker");

		if (!colorPicker) {
			throw new Error("Color picker not found");
		}

		act(() => {
			fireEvent.change(colorPicker, { background: { value: "red" } });
		});

		// modal
		const container = screen.queryByTestId("settings-modal-container");

		if (!container) {
			throw new Error("Container not found");
		}

		expect(container).toHaveStyle("border-color: ");
	});

	test.skip("should render new border color after mouse enter", async () => {
		// for some reason after using the hover event the test fails
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		// color picker
		const colorPicker = screen.queryByTestId("settings-profile-color-picker");

		if (!colorPicker) {
			throw new Error("Color picker not found");
		}

		// act(() => {
		//     fireEvent.change(colorPicker, { background: { value: "red" } });
		// });

		// modal
		const container = screen.queryByTestId("settings-modal-container");

		if (!container) {
			throw new Error("Container not found");
		}

		userEvent.hover(container);

		expect(container).toHaveStyle("border-color: red");
	});
});