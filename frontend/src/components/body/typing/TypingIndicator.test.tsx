import { describe, expect, test } from "vitest";
import { useClientStore } from "../../../stores/clientStore";
import { useTypingStore } from "../../../stores/typingStore";
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "../../../utils/tests/test-utils";
import type { ClientEntity } from "../../../utils/types/customTypes";
import { TypingIndicator } from "./TypingIndicator";

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
		const map = new Map<string, ClientEntity>();
		map.set("123", {
			clientDbId: "123",
			clientUsername: "Foo",
			availability: true,
		});
		useClientStore.getState().setClientMap(map);
		useTypingStore.getState().addTypingClientId("123");
		render(<TypingIndicator />);
		expect(screen.getByText(/Foo is typing/i)).not.toBeNull();
	});

	test("should render multiple names 'Foo, Bar are typing'", () => {
		const map = new Map<string, ClientEntity>();
		map.set("123", {
			clientDbId: "123",
			clientUsername: "Foo",
			availability: true,
		});
		map.set("456", {
			clientDbId: "456",
			clientUsername: "Bar",
			availability: true,
		});
		useClientStore.getState().setClientMap(map);
		useTypingStore.getState().addTypingClientId("123");
		useTypingStore.getState().addTypingClientId("456");
		render(<TypingIndicator />);
		expect(screen.getByText(/Foo, Bar are typing/i)).not.toBeNull();
	});

	test("indicator should have 100 opacity", async () => {
		const map = new Map<string, ClientEntity>();
		map.set("123", {
			clientDbId: "123",
			clientUsername: "Foo",
			availability: true,
		});
		useClientStore.getState().setClientMap(map);
		useTypingStore.getState().addTypingClientId("123");
		render(<TypingIndicator />);
		await waitFor(() => {
			expect(
				screen.queryByTestId("typing-indicator-container"),
			).toHaveStyle({
				opacity: 0.7,
			});
		});
	});

	test("indicator should have 100 opacity", async () => {
		const map = new Map<string, ClientEntity>();
		map.set("123", {
			clientDbId: "123",
			clientUsername: "Foo",
			availability: true,
		});
		useClientStore.getState().setClientMap(map);
		useTypingStore.getState().addTypingClientId("123");
		render(<TypingIndicator />);
		const container = await screen.findByTestId(
			"typing-indicator-container",
		);

		fireEvent.mouseEnter(container);

		await waitFor(() => {
			expect(container).toHaveStyle({
				opacity: 0.3,
			});
		});
	});
});
