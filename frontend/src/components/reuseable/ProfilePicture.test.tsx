import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { ProfilePicture } from "./ProfilePicture";

describe("ProfilePicture", () => {
	it("should render", async () => {
		render(<ProfilePicture
			pictureHash="abc" clientDbId="abc" />);
		expect(screen.queryByTestId("dummy-profile-picture")).toBeInTheDocument();
	});

	it("should render the right size", async () => {
		render(
			<ProfilePicture
				pictureHash="abc"
				clientDbId="abc"
				style={{ width: "48px", height: "48px" }}
			/>,
		);
		expect(screen.queryByTestId("dummy-profile-picture")).toHaveAttribute(
			"style",
			"width: 48px; height: 48px;",
		);
	});

	it("should render the right picture", async () => {
		render(
			<ProfilePicture
				pictureHash="abc" clientDbId="abc" pictureUrl="https://example.com" />,
		);
		const picture = await screen.findByTestId("profile-picture");
		expect(picture).toHaveAttribute("src", "https://example.com");
	});
});