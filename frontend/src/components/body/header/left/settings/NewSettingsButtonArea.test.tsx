import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../utils/test-utils";
import { NewSettingsButtonArea } from "./NewSettingsButtonArea";

describe("NewSettingsButtonArea", () => {
    test("should render", () => {
        render(<NewSettingsButtonArea onClose={() => {}} />);
        const area = screen.getByTestId("settings-button-area");
        expect(area).toBeInTheDocument();
    });
});
