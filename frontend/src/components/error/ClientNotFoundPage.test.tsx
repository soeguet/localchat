import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ClientNotFoundPage } from "./ClientNotFoundPage";

describe("ClientNotFoundPage", () => {
    beforeEach(() => {
        render(<ClientNotFoundPage />);
    });

    test("renders reconnect button", () => {
        const reconnectButton = screen.getByText("Reconnect");
        expect(reconnectButton).toBeInTheDocument();
    });

    test("reconnect button is disabled initially", () => {
        const reconnectButton = screen.getByText("Reconnect");
        expect(reconnectButton).toBeDisabled();
    });

    test("abc", () => {
        const userNotFoundMessage = screen.getByText(
            "Client not found, please wait or try again.."
        );
        expect(userNotFoundMessage).toBeInTheDocument();
    });

    test("reconnect button is disabled initially", async () => {
        const button = screen.queryByTestId(
            "reconnect-button-client-not-found"
        );

        if (button === null) {
            throw new Error("Button should not be null");
        }
        expect(button).toBeDisabled();
    });

    test("reconnect button is enabled after 2000ms", async () => {
        const button = await screen.findByTestId(
            "reconnect-button-client-not-found"
        );
        await waitFor(
            () => {
                expect(button).not.toBeDisabled();
            },
            { timeout: 2000 }
        );
    });
});
