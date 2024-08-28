import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerModal } from "./BannerModal";
import { TopBanner } from "./TopBanner";

function BannerComponent() {
	const banners = useBannerStore((state) =>
		state.banners.filter((banner) => !banner.hidden),
	);
	const isBannerModalOpen = useBannerStore((state) => state.bannerModalOpen);

	if (banners.length === 0 && !isBannerModalOpen) {
		return;
	}

	if (banners.length === 0 && isBannerModalOpen) {
		return <BannerModal isBannerModalOpen={isBannerModalOpen} />;
	}

	return (
		<>
			<div>
				<TopBanner banners={banners} />
				<BannerModal isBannerModalOpen={isBannerModalOpen} />
			</div>
		</>
	);
}

export default BannerComponent;