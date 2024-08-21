import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BannerOverview } from "./BannerOverview";
import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerObject } from "../../../../utils/types/customTypes";

describe("BannerOverview", () => {
	test("check if td is rendered, since no banners are present", () => {
		const banners = [];
		useBannerStore.getState().setBanners(banners);

		render(
			<BannerOverview
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setBannerModalOpen={() => {}}
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setAddBannerMode={() => {}}
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setBannerObject={() => {}}
			/>,
		);

		const item = screen.queryByRole("cell");
		expect(item).toBeNull();
	});
	test("check if td is rendered, since one banner is present", () => {
		const banners: BannerObject[] = [
			{
				id: "1",
				title: "localchat v1",
				message: "join our local chat!",
				priority: 1,
				hidden: false,
			},
		];
		useBannerStore.getState().setBanners(banners);

		render(
			<BannerOverview
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setBannerModalOpen={() => {}}
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setAddBannerMode={() => {}}
				// biome-ignore lint/suspicious/noEmptyBlockStatements: not needed here
				setBannerObject={() => {}}
			/>,
		);

		const item = screen.queryByText("localchat v1");
		expect(item).not.toBeNull();
	});
});