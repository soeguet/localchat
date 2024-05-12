import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../../utils/test-utils";
import { NewProfilePicturePicker } from "./NewProfilePicturePicker";

describe("NewProfilePicturePicker", () => {
    test("should render container", () => {
        render(<NewProfilePicturePicker />);
        expect(
            screen.getByTestId("profile-picture-picker-container")
        ).toBeInTheDocument();
    });
});