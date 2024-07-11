import { describe, it } from "vitest";
import { render } from "../../../../../../utils/test-utils";
import { FontSizeButton } from "./FontSizeButton";
import { fireEvent, screen } from "@testing-library/react";

describe("FontSizeButton", () => {
	it("should not render the popup", () => {
		render(<FontSizeButton />);
		expect(screen.queryByTestId("font-size-popup")).not.toBeInTheDocument();
	});
	it("should render the popup", async () => {
		render(<FontSizeButton />);
		fireEvent.click(screen.getByRole("button"));
		expect(screen.queryByTestId("font-size-popup")).toBeInTheDocument();
	});
});
