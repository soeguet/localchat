import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { useBannerStore } from "../../../stores/bannerStore";
import type { BannerObject } from "../../../utils/types/customTypes";
import { TopBanner } from "./TopBanner";

describe("TopBanner", () => {
	test("render banner list", async () => {
		const banners: BannerObject[] = [
			{
				id: "1",
				title: "localchat v1",
				message: "join our local chat!",
				priority: 1,
				hidden: false,
			},
			{
				id: "2",
				title: "localchat v2",
				message: "join our prio 2 local chat!",
				priority: 2,
				hidden: false,
			},
		];
		useBannerStore.getState().setBanners(banners);

		render(<TopBanner banners={banners} />);

		const bannerListContainer = await screen.findByTestId(
			"banner-list-container",
		);
		expect(bannerListContainer).toBeInTheDocument();
	});
	test.skip("dont render banner list, if all banners are hidden", () => {
		const banners: BannerObject[] = [
			{
				id: "1",
				title: "localchat v1",
				message: "join our local chat!",
				priority: 1,
				hidden: true,
			},
			{
				id: "2",
				title: "localchat v2",
				message: "join our prio 2 local chat!",
				priority: 2,
				hidden: true,
			},
		];
		useBannerStore.getState().setBanners(banners);

		render(<TopBanner banners={banners} />);

		const bannerListContainer = screen.queryByTestId("banner-list-container");
		expect(bannerListContainer).toBeNull();
	});
});