import { render, screen } from "../../../../../../utils/test-utils";
import { SettingsLanguagePicker } from "./SettingsLanguagePicker";

describe("SettingsLanguagePicker", () => {
    test("should render settings-language-picker container", () => {
        render(<SettingsLanguagePicker />);
        const container = screen.queryByTestId(
            "settings-language-picker-container"
        );
        expect(container).toBeInTheDocument();
    });
});