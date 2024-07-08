import { render, screen, userEvent } from "../../../../../utils/test-utils";
import { FlagButton } from "./FlagButton";
import { waitFor } from "@testing-library/react";
import { useSelectedLanguageStore } from "../../../../../stores/selectedLanguageStore";

describe("FlagButton", () => {
	test("should render the FlagButton component", async () => {
		render(<FlagButton />);
		const flagButton = screen.getByRole("button");
		expect(flagButton).toBeInTheDocument();
	});

	test("should render britain flag at start", () => {
		render(<FlagButton />);
		expect(screen.queryByTestId("flag-button")).toBeInTheDocument();
	});

	test("should render britain flag at start", () => {
		render(<FlagButton />);
		expect(screen.getByTestId("american-flag-svg")).toBeInTheDocument();
	});

	test("should switch the language to 'de' when the button is clicked", async () => {
		render(<FlagButton />);
		const button = screen.getByTestId("flag-button");
		await waitFor(() => userEvent.click(button));
		expect(screen.getByTestId("german-flag-svg")).toBeInTheDocument();
	});

	test("should render change language", async () => {
		render(<FlagButton />);
		const flagButton = screen.getByRole("button");
		await waitFor(() => userEvent.click(flagButton));
		expect(screen.getByTestId("german-flag-svg")).toBeInTheDocument();
		await waitFor(() => userEvent.click(flagButton));
		expect(screen.getByTestId("american-flag-svg")).toBeInTheDocument();
	});

	test("clicking updates store variable", async () => {
		render(<FlagButton />);
		const flagButton = screen.getByRole("button");
		await waitFor(() => userEvent.click(flagButton));
		expect(useSelectedLanguageStore.getState().selectedLanguage).toBe("de");
		await waitFor(() => userEvent.click(flagButton));
		expect(useSelectedLanguageStore.getState().selectedLanguage).toBe("en");
	});
});
