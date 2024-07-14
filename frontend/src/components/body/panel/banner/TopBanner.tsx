import { useEffect, useState } from "react";
import { useBannerStore } from "../../../../stores/bannerStore";
import { AllBannersButton } from "./AllBannersButton";

function TopBanner() {
	const banners = useBannerStore((state) =>
		state.banners.filter((banner) => banner.hidden === false),
	);

	const [activeBanner, setActiveBanner] = useState(banners[0] || {});

	useEffect(() => {
		const interval = setInterval(() => {
			const newBanner =
				banners[Math.floor(Math.random() * banners.length)];
			setActiveBanner(newBanner);
		}, 5000);
		return () => clearInterval(interval);
	}, [banners]);

	if (banners.length === 0) {
		return null;
	}
	return (
		<>
			<div className="relative z-20 items-center gap-x-6 bg-sky-900 px-6 py-5 sm:px-3.5 sm:before:flex-1">
				<AllBannersButton />

				<div className="mx-14 flex justify-center leading-6 text-white">
					<div>
						<strong className="font-semibold">
							{activeBanner.title}
						</strong>
						<svg
							viewBox="0 0 2 2"
							aria-hidden="true"
							className="mx-2 inline h-0.5 w-0.5 fill-current">
							<circle r={1} cx={1} cy={1} />
						</svg>
						{activeBanner.message}
					</div>
				</div>
			</div>
		</>
	);
}

export { TopBanner };
