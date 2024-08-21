import { render, screen, userEvent } from "../../../../utils/tests/test-utils";
import { InfoMenuButton } from "./InfoMenuButton";

beforeEach(() => {
	HTMLDialogElement.prototype.showModal = vi.fn();
});

describe("InfoMenuModal", () => {
	test("should not render", () => {
		render(<InfoMenuButton />);

		const dialog = document.querySelector("info-menu-modal");
		expect(dialog).toBeNull();
	});

	test("should render", async () => {
		render(<InfoMenuButton />);

		const infoMenuModalButton = screen.getByTestId("info-menu-modal-button");
		await userEvent.click(infoMenuModalButton);

		const modal = screen.getByTestId("info-menu-modal");
		expect(modal).toBeInTheDocument();
	});

	test("should render version number", async () => {
		render(<InfoMenuButton />);
		const infoMenuModalButton = screen.getByTestId("info-menu-modal-button");
		await userEvent.click(infoMenuModalButton);

		const version = screen.getByText(/version/i);
		const versionNumber = screen.getByText(/\d{1,3}\.\d{1,3}\.\d{1,3}/);
		expect(version).toBeInTheDocument();
		expect(versionNumber).toBeInTheDocument();
	});
});