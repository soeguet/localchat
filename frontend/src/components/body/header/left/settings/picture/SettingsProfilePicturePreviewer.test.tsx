import { render } from "../../../../../../utils/test-utils";
import { SettingsProfilePicturePreviewer } from "./SettingsProfilePicturePreviewer";
import { screen } from "@testing-library/react";

describe("SettingsProfilePicturePreviewer", () => {
    test("should render profile picture preview", () => {
        render(<SettingsProfilePicturePreviewer />);
        expect(
            screen.queryByTestId("settings-profile-picture-preview")
        ).toBeInTheDocument();
    });
});