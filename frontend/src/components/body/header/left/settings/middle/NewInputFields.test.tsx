import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../../utils/test-utils";
import { NewInputFields } from "./NewInputFields";

describe("NewInputFields", () => {
    test("should render input field container]]", () => {
        render(<NewInputFields />);
        expect(
            screen.getByTestId("settings-input-field-container")
        ).toBeInTheDocument();
    });
});
