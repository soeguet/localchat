import { render } from "../../../../../../utils/test-utils";
import { SettingsColorPicker } from "./SettingsColorPicker";
import { screen } from "@testing-library/react";

describe("SettingsColorPicker", () => {
    test("it should render the color picker", () => {
        // To be implemented
        render(<SettingsColorPicker />);
        const container = screen.queryByTestId("settings-profile-color-picker");
        expect(container).toBeInTheDocument();
    });
});