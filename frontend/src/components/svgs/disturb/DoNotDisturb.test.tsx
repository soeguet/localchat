import {render, screen} from "@testing-library/react";
import {describe} from "vitest";
import {DoNotDisturb} from "./DoNotDisturb";

describe("DoNotDisturb", () => {
    it("should render", async () => {
        render(<DoNotDisturb style={{width: "48px", height: "48px"}}/>);
        expect(screen.queryByTestId("do-not-disturb-svg")).toBeInTheDocument();
    });

    it("should render the right size", async () => {
        render(<DoNotDisturb style={{width: "48px", height: "48px"}}/>);
        const svg = screen.queryByTestId("do-not-disturb-svg");
        expect(svg).toHaveAttribute("style", "width: 48px; height: 48px;");
    });
});