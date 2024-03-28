import { describe, expect } from "vitest";
import { render } from "../../../../../utils/test-utils";
import UnreadMessageButton from "./UnreadMessageButton";
import { act, screen } from "@testing-library/react";
import useUnseenMessageCountStore from "../../../../../stores/unseenMessageCountStore";

describe("UnreadMessageButton", () => {
    it("should not render", () => {
        render(<UnreadMessageButton />);
        expect(
            screen.queryByTestId("unread-message-button")
        ).not.toBeInTheDocument();
    });

    it("should render the component", () => {
        render(<UnreadMessageButton />);
        act(() =>
            useUnseenMessageCountStore.getState().incrementUnseenMessageCount()
        );
        expect(screen.getByTestId("unread-message-button")).toBeInTheDocument();
    });
});
