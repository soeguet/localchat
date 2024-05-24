import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClientNotFoundPage } from "./ClientNotFoundPage";

describe("ClientNotFoundPage", () => {
    beforeEach(() => {
        render(<ClientNotFoundPage />);
    });

    // test("renders client not found message", () => {
    //     const clientNotFoundMessage = screen.getByText("Client not found");
    //     expect(clientNotFoundMessage).toBeInTheDocument();
    // });

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
    test.skip("reconnect button is enabled after 2000ms", async () => {
        const button = screen.queryByTestId(
            "reconnect-button-client-not-found"
        );
        await waitFor(() => {}, { timeout: 5000 });

        if (button === null) {
            throw new Error("Button should not be null");
        }
        expect(button).not.toBeDisabled();
    });

    // test("clicking on reconnect button calls WindowReloadApp", () => {
    //     const mockWindowReloadApp = vi.fn();
    //     vi.spyOn(global, "WindowReloadApp").mockImplementation(
    //         mockWindowReloadApp
    //     );
    //     const reconnectButton = screen.getByText("Reconnect");
    //     fireEvent.click(reconnectButton);
    //     expect(mockWindowReloadApp).toHaveBeenCalled();
    // });
});
