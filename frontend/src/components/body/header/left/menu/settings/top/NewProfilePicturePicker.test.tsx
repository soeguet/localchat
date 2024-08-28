import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../../../utils/tests/test-utils";
import { NewProfilePicturePicker } from "./NewProfilePicturePicker";

describe("NewProfilePicturePicker", () => {
	test("should render container", () => {
		render(<NewProfilePicturePicker />);
		const container = screen.queryByTestId("profile-picture-picker-container");
		expect(container).toBeInTheDocument();
	});
});