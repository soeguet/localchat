import { PreferPictureUrlCheckbox } from "./PreferPictureUrlCheckbox";
import { render } from "../../../../../../utils/test-utils";
import { screen } from "@testing-library/react";

describe("PreferPictureUrlCheckbox", () => {
    test("should render prefer picture urls checkbox", () => {
        render(<PreferPictureUrlCheckbox isSelected={() => {}} />);
        expect(
            screen.queryByTestId("settings-prefer-picture-url")
        ).toBeInTheDocument();
    });
});