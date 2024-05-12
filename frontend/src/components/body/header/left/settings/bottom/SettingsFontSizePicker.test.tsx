import { test } from "vitest";
import { render, screen } from "../../../../../../utils/test-utils";
import { SettingsFontSizePicker } from "./SettingsFontSizePicker";

describe("SettingsFontSizePicker", () => {
    test("should render font size picker", () => {
        render(<SettingsFontSizePicker />);
        const container = screen.queryByTestId("settings-font-size-picker");
        expect(container).toBeInTheDocument();
    });
});