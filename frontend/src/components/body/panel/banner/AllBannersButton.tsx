import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerListSvg } from "../../../svgs/banner/BannerListSvg";

function AllBannersButton() {
	const bannerCount = useBannerStore((state) =>
		state.countBanners(state.banners),
	);
	const bannerModalSetOpen = useBannerStore(
		(state) => state.setBannerModalOpen,
	);

	return (
		<>
			<button
				type="button"
				className="absolute -translate-y-2 items-center rounded-full bg-white p-2 text-left text-sm text-white transition"
				onClick={() => bannerModalSetOpen(true)}>
				<BannerListSvg
					number={bannerCount}
					accentColor="#4a90e2"
					backgroundColor="#000000"
				/>
			</button>
		</>
	);
}

export { AllBannersButton };
