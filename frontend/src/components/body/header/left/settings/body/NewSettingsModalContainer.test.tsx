import { expect, test, describe } from "vitest";
import { render, screen, userEvent } from "../../../../../../utils/tests/test-utils";
import { NewSettingsModalContainer } from "./NewSettingsModalContainer";
import { NewSettingsModalButton } from "./button/NewSettingsModalButton";
import useSettingsStore from "../../../../../../stores/settingsStore";

beforeEach(() => {
	HTMLDialogElement.prototype.showModal = vi.fn();
});
describe("NewSettingsModalContainer", () => {
	test("should render component", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);
		const container = screen.getByTestId("settings-modal-container");
		expect(container).toBeInTheDocument();
	});

	test("should close on button click", async () => {
		const onClose = vi.fn();
		render(<NewSettingsModalContainer onClose={onClose} onSave={() => {}} />);
		const closeButton = screen.getByTestId("close-settings-modal-button");
		await userEvent.click(closeButton);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	test("should close modal if parent is rendered and close button is clicked", async () => {
		render(<NewSettingsModalButton />);
		const settingsButton = screen.getByTestId("settings-menu-button");
		await userEvent.click(settingsButton);

		const closeSettingsButton = screen.getByTestId(
			"close-settings-modal-button",
		);
		await userEvent.click(closeSettingsButton);

		const settingsModal = screen.queryByTestId("settings-modal");

		expect(settingsModal).toBeNull();
	});

	test("should have no border", () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);
		const container = screen.getByTestId("settings-modal-container");
		expect(container).toHaveStyle({ borderColor: "" });
	});

	test("should have green border", async () => {
		render(<NewSettingsModalContainer onSave={() => {}} onClose={() => {}} />);

		const borderColor = useSettingsStore.getState().localColor;
		const container = screen.getByTestId("settings-modal-container");
		container.dispatchEvent(new MouseEvent("mouseenter"));
		userEvent.hover(container);
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		await delay(50);
		expect(container).toHaveStyle({ borderColor: borderColor });
		expect(container).not.toHaveStyle({ borderColor: "black" });
	});
});