import { screen } from "@testing-library/react";
import { render } from "../../../../../../utils/test-utils";
import { PreferPictureUrlCheckbox } from "./PreferPictureUrlCheckbox";

describe("PreferPictureUrlCheckbox", () => {
    test("should render prefer picture urls checkbox", () => {
        render(<PreferPictureUrlCheckbox isSelected={() => {}} />);
        expect(
            screen.queryByTestId("settings-prefer-picture-url")
        ).toBeInTheDocument();
    });
});