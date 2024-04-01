import {render} from "../../../../utils/test-utils";
import {HeaderLeft} from "./HeaderLeft";
import {screen} from "@testing-library/react";

describe("HeaderLeft", () => {
    it("should render", () => {
        render(<HeaderLeft />);
        expect(screen.queryByTestId("header-left-div")).toBeInTheDocument();
    });
});