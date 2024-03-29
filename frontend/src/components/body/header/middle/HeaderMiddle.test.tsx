import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeaderMiddle from "./HeaderMiddle";
import useWebsocketStore from "../../../../stores/websocketStore";

describe("HeaderMiddle", () => {

    it("should render", () => {

        render(<HeaderMiddle />);
        expect(screen.queryByTestId("header-middle")).toBeInTheDocument();
    });

    it("should render disconnected", () => {

        render(<HeaderMiddle />);
        expect(screen.getByTestId("disconnected-svg")).toBeInTheDocument();
        expect(screen.getByTestId("reconnect-button")).toBeInTheDocument();
    });

    it("should render connected button", () => {

        useWebsocketStore.getState().setIsConnected(true);
        render(<HeaderMiddle />);
        expect(screen.getByTestId("connected-svg")).toBeInTheDocument();
    });
});
