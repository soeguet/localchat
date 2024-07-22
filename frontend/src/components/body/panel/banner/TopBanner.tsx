import { useEffect, useState } from "react";
import { useBannerStore } from "../../../../stores/bannerStore";
import { AllBannersButton } from "./AllBannersButton";
import { CountdownTimer } from "./CountdownTimer";

function TopBanner() {
	const banners = useBannerStore((state) =>
		state.banners.filter((banner) => banner.hidden === false),
	);
	const [index, setIndex] = useState(0);
	const [activeBanner, setActiveBanner] = useState(banners[0] || {});

	const getPriorityDuration = (priority: number) => {
		// Adjust these values as needed
		const baseDuration = 5000; // 5 seconds
		return baseDuration * priority;
	};

	useEffect(() => {
		const duration = getPriorityDuration(activeBanner.priority);
		const interval = setInterval(() => {
			let newIndex = index + 1;
			if (newIndex >= banners.length) {
				newIndex = 0;
			}
			setIndex(newIndex);
			setActiveBanner(banners[newIndex]);
		}, duration);
		return () => clearInterval(interval);
	}, [banners, index, activeBanner.priority]);

	if (!banners || banners.length === 0) {
		return null;
	}

	return (
		<>
			<div
				className="relative z-20 items-center gap-x-6 bg-sky-900 px-6 py-5 sm:px-3.5 sm:before:flex-1"
				data-testid="banner-list-container">
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

				<CountdownTimer priority={activeBanner.priority} />
			</div>
		</>
	);
}

export { TopBanner };
