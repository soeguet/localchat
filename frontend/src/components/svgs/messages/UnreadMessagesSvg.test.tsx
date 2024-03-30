import { describe, expect, it } from "vitest";
import UnreadMessagesSvg from "./UnreadMessagesSvg";
import { render, screen } from "../../../utils/test-utils";
import useUnseenMessageCountStore from "../../../stores/unseenMessageCountStore";

describe("UnreadMessagesSvg", () => {
    it("should render", async () => {
        render(<UnreadMessagesSvg />);
        expect(screen.queryByTestId("unread-messages-svg")).toBeInTheDocument();
    });

    it("should render the correct number of unread messages", async () => {
        useUnseenMessageCountStore.setState({ unseenMessageCount: 5 });
        render(<UnreadMessagesSvg />);
        expect(screen.queryByText("5")).toBeInTheDocument();
    });

    it("the color should change every 750ms", async () => {
        render(<UnreadMessagesSvg />);
        const svg = screen.queryByTestId("unread-messages-svg");
        const initialColor = svg?.getAttribute("stroke");
        await new Promise((r) => setTimeout(r, 800));
        const updatedColor = svg?.getAttribute("stroke");
        expect(initialColor).not.toBe(updatedColor);
    });
});
