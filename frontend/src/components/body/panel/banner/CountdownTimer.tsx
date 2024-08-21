import { useState, useEffect } from "react";
import type { BannerObject } from "../../../../utils/types/customTypes";

type CountdownTimerProps = {
	activeBanner: BannerObject;
};

// some random hardcoded values in here, but it works.. for now :-)
function CountdownTimer(props: CountdownTimerProps) {
	const initialTime = props.activeBanner.priority * 10;
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const progress = Math.max((timeLeft / initialTime) * 100, 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => {
		const sections = initialTime - 1;
		const interval = initialTime / sections;

		setTimeLeft(initialTime);
		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => Math.max(prevTime - interval / 10, 0));
		}, 1000 / 10);
		return () => {
			setTimeLeft(0);
			clearInterval(timerId);
		};
	}, [props.activeBanner]);

	return (
		<div className="absolute bottom-0 left-0 right-0 w-full">
			<div className="ab h-[2px] w-full overflow-hidden bg-sky-900">
				<div
					className="h-full bg-white/75 transition-all duration-100 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}

export { CountdownTimer };