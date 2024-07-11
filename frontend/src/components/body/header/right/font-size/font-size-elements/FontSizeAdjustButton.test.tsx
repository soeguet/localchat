import { render, screen } from "@testing-library/react";
import { FontSizeAdjustButton } from "./FontSizeAdjustButton";
import { expect } from "vitest";

describe("FontSizeAdjustButton", () => {
	test("should render", () => {
		render(
			<FontSizeAdjustButton onClick={() => {}}>test</FontSizeAdjustButton>,
		);
		expect(screen.getByText("test")).toBeInTheDocument();
	});

	test("should call onClick", () => {
		const onClick = vi.fn();
		render(<FontSizeAdjustButton onClick={onClick}>test</FontSizeAdjustButton>);
		screen.getByText("test").click();
		expect(onClick).toHaveBeenCalled();
	});
});
