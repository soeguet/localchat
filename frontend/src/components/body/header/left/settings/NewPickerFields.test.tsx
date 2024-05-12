import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../utils/test-utils";
import { NewPickerFields } from "./NewPickerFields";

describe("NewPickerFields", () => {
    test("should render settings-picker-field-container", () => {
        render(<NewPickerFields />);
        const container = screen.queryByTestId(
            "settings-picker-field-container"
        );

        expect(container).toBeInTheDocument();
    });
});
