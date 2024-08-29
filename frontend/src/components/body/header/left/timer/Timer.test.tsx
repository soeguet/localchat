import { describe } from "vitest";
import { render, screen } from "../../../../../utils/tests/test-utils";
import { Timer } from "./Timer";
import { act } from "react";

describe("Timer", () => {
	it("should render", async () => {
		render(<Timer />);
		expect(
			screen.queryByTestId("do-not-disturb-timer"),
		).toBeInTheDocument();
	});

	it("should render the right time", async () => {
		render(<Timer />);
		const timer = screen.queryByTestId("do-not-disturb-timer");
		expect(timer).toHaveTextContent("5:00");
	});

	it("should render the right time after 1 second", async () => {
		render(<Timer />);
		await act(async () => {
			await new Promise((r) => setTimeout(r, 1005));
		});
		const timer = screen.queryByTestId("do-not-disturb-timer");
		expect(timer).toHaveTextContent("4:59");
	});
});