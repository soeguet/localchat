import { expect, test, describe } from "vitest";
import { render, screen } from "../../../../../../../../../utils/tests/test-utils";
import { PicturePreviewHandler } from "./PicturePreviewHandler";
import { createRef } from "react";

describe("PicturePreviewHandler", () => {
	test("renders", () => {
		const fakeRef = createRef<HTMLInputElement>();
		render(
			<PicturePreviewHandler
				preferPictureUrl={true}
				setLocalProfilePicture={() => {}}
				urlInputRef={fakeRef}
			/>,
		);

		const container = screen.queryByTestId("picture-preview-container");

		expect(container).toBeInTheDocument();
	});
});