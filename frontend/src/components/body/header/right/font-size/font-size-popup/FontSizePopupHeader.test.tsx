import { FontSizePopupHeader } from "./FontSizePopupHeader";
import { render } from "../../../../../../utils/test-utils";
import { screen } from "@testing-library/react";

describe("FontSizePopupHeader", () => {
	it("should render the component", () => {
		render(<FontSizePopupHeader fontSize={16} />);
		expect(screen.getByText("Adjust Font Size - 16")).toBeInTheDocument();
	});
});
