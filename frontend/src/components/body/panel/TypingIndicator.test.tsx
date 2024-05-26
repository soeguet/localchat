import { expect, test, describe } from "vitest";
import { useTypingStore } from "../../../stores/typingStore";
import { fireEvent, render, screen, waitFor } from "../../../utils/test-utils";
import { useClientStore } from "../../../stores/clientStore";
import { TypingIndicator } from "./TypingIndicator";
import { argv0 } from "process";
import { debug } from "util";

describe("TypingIndicator", () => {
    test("should render typing indicator", () => {
        useTypingStore.getState().addTypingClientId("123");
        render(<TypingIndicator />);
        expect(screen.getByText(/is typing/i)).not.toBeNull();
    });

    test("should render 'unknown' as typing client", () => {
        useTypingStore.getState().addTypingClientId("123");
        render(<TypingIndicator />);
        expect(screen.getByText(/Unknown is typing/i)).not.toBeNull();
    });

    test("should render name 'Foo is typing'", () => {
        useClientStore
            .getState()
            .setClients([{ clientDbId: "123", clientUsername: "Foo" }]);
        useTypingStore.getState().addTypingClientId("123");
        render(<TypingIndicator />);
        expect(screen.getByText(/Foo is typing/i)).not.toBeNull();
    });

    test("should render multiple names 'Foo, Bar are typing'", () => {
        useClientStore.getState().setClients([
            { clientDbId: "123", clientUsername: "Foo" },
            { clientDbId: "456", clientUsername: "Bar" },
        ]);
        useTypingStore.getState().addTypingClientId("123");
        useTypingStore.getState().addTypingClientId("456");
        render(<TypingIndicator />);
        expect(screen.getByText(/Foo, Bar are typing/i)).not.toBeNull();
    });

    test("indicator should have 100 opacity", async () => {
        useClientStore.getState().setClients([
            {
                clientDbId: "123",
                clientUsername: "Foo",
            },
        ]);
        useTypingStore.getState().addTypingClientId("123");
        render(<TypingIndicator />);
        await waitFor(() => {
            expect(
                screen.queryByTestId("typing-indicator-container")
            ).toHaveStyle({
                opacity: 0.7,
            });
        });
    });

    test("indicator should have 100 opacity", async () => {
        useClientStore.getState().setClients([
            {
                clientDbId: "123",
                clientUsername: "Foo",
            },
        ]);
        useTypingStore.getState().addTypingClientId("123");
        render(<TypingIndicator />);
        const container = await screen.findByTestId(
            "typing-indicator-container"
        );

        fireEvent.mouseEnter(container);

        await waitFor(() => {
            expect(container).toHaveStyle({
                opacity: 0.3,
            });
        });
    });
});
