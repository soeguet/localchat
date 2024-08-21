import { useEffect, useState } from "react";
import { AllBannersButton } from "./AllBannersButton";
import { CountdownTimer } from "./CountdownTimer";
import type { BannerObject } from "../../../../utils/types/customTypes";

type TopBannerProps = {
	banners: BannerObject[];
};
function TopBanner(props: TopBannerProps) {
	const [index, setIndex] = useState(0);
	const [activeBanner, setActiveBanner] = useState(props.banners[0] || {});

	if (!props.banners || props.banners.length === 0) {
		return null;
	}

	useEffect(() => {
		const duration = getPriorityDuration(activeBanner.priority);
		const interval = setInterval(() => {
			let newIndex = index + 1;
			if (newIndex >= props.banners.length) {
				newIndex = 0;
			}
			setIndex(newIndex);
			setActiveBanner(props.banners[newIndex]);
		}, duration);
		return () => clearInterval(interval);
	}, [props.banners, index, activeBanner.priority]);

	function getPriorityDuration(priority: number) {
		// random hardcoded value
		const baseDuration = 10_000;
		return baseDuration * priority;
	}

	const bannerObjectWithDuration = props.banners.map((banner) => {
		return { ...banner, duration: getPriorityDuration(banner.priority) };
	});

	return (
		<>
			<div
				className="relative z-20 items-center gap-x-6 bg-sky-900 px-6 py-5 sm:px-3.5 sm:before:flex-1"
				data-testid="banner-list-container"
			>
				<AllBannersButton />

				<div className="mx-14 flex justify-center leading-6 text-white">
					<div>
						<strong className="font-semibold">{activeBanner.title}</strong>
						<svg
							viewBox="0 0 2 2"
							aria-hidden="true"
							className="mx-2 inline h-0.5 w-0.5 fill-current"
						>
							<circle r={1} cx={1} cy={1} />
						</svg>
						{activeBanner.message}
					</div>
				</div>

				{bannerObjectWithDuration.length > 1 && (
					<CountdownTimer activeBanner={activeBanner} />
				)}
			</div>
		</>
	);
}

export { TopBanner };