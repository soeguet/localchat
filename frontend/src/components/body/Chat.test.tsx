import { describe, vi } from "vitest";
import { useClientStore } from "../../stores/clientStore";

import { screen } from "@testing-library/react";
import * as windowFocussed from "../../hooks/body/useWindowFocussedListener";
import * as socketConnection from "../../hooks/socket/useWebsocketConnection";
import { useUserStore } from "../../stores/userStore";
import { render } from "../../utils/tests/test-utils";
import type { ClientEntity } from "../../utils/types/customTypes";
import { Chat } from "./Chat";

describe("Chat", () => {
	it("should render Chat", () => {
		useUserStore.getState().setMyId("1");

		const map = new Map<string, ClientEntity>();
		map.set("1", {
			clientDbId: "1",
			clientUsername: "test",
			clientColor: "red",
			clientProfilePictureHash: "image",
			availability: true,
		});

		useClientStore.getState().setClientMap(map);

		vi.spyOn(socketConnection, "useWebsocketConnection").mockReturnValue();
		vi.spyOn(windowFocussed, "useWindowFocussedListener").mockReturnValue();

		render(<Chat />);

		expect(screen.queryByTestId("chat-main")).toBeInTheDocument();
	});
});