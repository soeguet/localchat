import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../../../../../utils/tests/test-utils";
import { NewInputUsername } from "./NewInputUsername";

describe("NewInputUsername", () => {
	test("should render input field for username", () => {
		render(<NewInputUsername />);
		const container = screen.queryByTestId("settings-input-username");
		expect(container).toBeInTheDocument();
	});
});