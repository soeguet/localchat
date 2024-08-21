import { expect, test, describe } from "vitest";
import { fireEvent, render, screen } from "../../../../../../utils/tests/test-utils";
import { NewInputIp } from "./NewInputIp";

describe("NewInputIp", () => {
	test("should render input field container", () => {
		render(<NewInputIp />);
		expect(screen.getByTestId("settings-input-ip")).toBeInTheDocument();
	});

	test("should render label for socket IP", () => {
		render(<NewInputIp />);
		expect(screen.getByLabelText("Socket IP")).toBeInTheDocument();
	});

	test("should update local IP value on input change", () => {
		render(<NewInputIp />);
		const inputElement = screen.getByLabelText("Socket IP") as HTMLInputElement;
		fireEvent.change(inputElement, { target: { value: "127.0.0.1" } });
		expect(inputElement.value).toBe("127.0.0.1");
	});
});