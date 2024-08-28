import { describe, it, vi } from "vitest";
import { render } from "../../../../../utils/tests/test-utils";
import { ClientName } from "./ClientName";
import * as user from "../../../../../stores/userStore";
import * as client from "../../../../../stores/clientStore";
import * as dnd from "../../../../../stores/doNotDisturbStore";
import { screen } from "@testing-library/react";

vi.spyOn(user, "useUserStore").mockReturnValue("test");
vi.spyOn(client, "useClientStore").mockReturnValue("test");
//vi.spyOn(dnd, "useDoNotDisturbStore").mockReturnValue({});

describe("ClientName", () => {
	it("should show do not disturb", () => {
		vi.spyOn(dnd, "useDoNotDisturbStore").mockReturnValue(true);

		render(<ClientName />);
		expect(screen.getByTestId("do-not-disturb-container")).toBeInTheDocument();
	});

	it("should show client name", () => {
		vi.spyOn(dnd, "useDoNotDisturbStore").mockReturnValue(false);
		render(<ClientName />);
		expect(screen.getByTestId("clientname-span")).toBeInTheDocument();
	});
});