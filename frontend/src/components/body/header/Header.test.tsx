import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";
import useDoNotDisturbStore from "../../../stores/doNotDisturbStore";

describe("Header", () => {
    it("should render", () => {
        render(<Header />);
        expect(screen.queryByTestId("header")).toBeInTheDocument();
    });

    it("should render without do not disturb", () => {
        render(<Header />);
        expect(screen.getByTestId("header")).toHaveClass("bg-gray-700");
    });

    it("should render with do not disturb", async () => {
        useDoNotDisturbStore.getState().setDoNotDisturb(true);
        render(<Header />);
        expect(screen.getByTestId("header")).toHaveClass("bg-orange-700");
    });
});
