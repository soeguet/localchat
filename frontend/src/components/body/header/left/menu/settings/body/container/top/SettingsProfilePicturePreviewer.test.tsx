import { render } from "../../../../../../../../../utils/tests/test-utils";
import { SettingsProfilePicturePreviewer } from "./SettingsProfilePicturePreviewer";
import { screen } from "@testing-library/react";

describe("SettingsProfilePicturePreviewer", () => {
	test("should render profile picture preview", () => {
		render(<SettingsProfilePicturePreviewer />);
		expect(
			screen.queryByTestId("settings-profile-picture-preview"),
		).toBeInTheDocument();
	});

	test("should render standard profile picture, but NOT the preview (yet)", () => {
		render(<SettingsProfilePicturePreviewer />);
		const profilePicture = screen.getByTestId("dummy-profile-picture");
		const newPreviewPicture = screen.queryByTestId("settings-picture-preview");
		const banner = screen.queryByTestId("profile-picture-preview-banner");

		expect(banner).not.toBeInTheDocument();
		expect(newPreviewPicture).not.toBeInTheDocument();
		expect(profilePicture).toBeInTheDocument();
	});
});