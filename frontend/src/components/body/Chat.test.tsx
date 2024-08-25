import { describe, vi } from "vitest";
import { useClientStore } from "../../stores/clientStore";

import * as socketConnection from "../../hooks/socket/useWebsocketConnection";
import * as windowFocussed from "../../hooks/body/useWindowFocussedListener";
import { useUserStore } from "../../stores/userStore";
import { render } from "../../utils/tests/test-utils";
import { Chat } from "./Chat";
import { screen } from "@testing-library/react";

describe("Chat", () => {
	it("should render Chat", () => {
		useUserStore.getState().setMyId("1");
		useClientStore.getState().setClients([
			{
				clientDbId: "1",
				clientUsername: "test",
				clientColor: "red",
				clientProfilePictureHash: "image",
				availability: true,
			},
		]);

		vi.spyOn(socketConnection, "useWebsocketConnection").mockReturnValue();
		vi.spyOn(windowFocussed, "useWindowFocussedListener").mockReturnValue();

		render(<Chat />);

		expect(screen.queryByTestId("chat-main")).toBeInTheDocument();
	});
});