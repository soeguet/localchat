import { useState, useEffect } from "react";
import type { BannerObject } from "../../../../utils/customTypes";

type CountdownTimerProps = {
	priority: number;
	banners: (BannerObject & { duration: number })[];
};

// some random hardcoded values in here, but it works.. for now :-)
function CountdownTimer(props: CountdownTimerProps) {
	const getPriorityDuration = (prio: number) => {
		// base duration for each slide is 5 seconds, base duration for coundown a little less, else the bar jumps to start without reaching the end
		const baseDuration = 4.75;
		return baseDuration * prio;
	};

	const initialTime = getPriorityDuration(props.priority);
	const [timeLeft, setTimeLeft] = useState(initialTime);

	const progress = Math.max((timeLeft / initialTime) * 100, 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => {
		setTimeLeft(initialTime);
	}, [props.priority, initialTime]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => {
		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => Math.max(prevTime - 0.1, 0));
		}, 100);

		return () => clearInterval(timerId);
	}, [timeLeft, initialTime, props.banners]);

	return (
		<div className="absolute bottom-0 left-0 right-0 w-full">
			<div className="ab h-[3px] w-full overflow-hidden rounded-full bg-sky-900">
				<div
					className="h-full bg-white/50 transition-all duration-100 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}

export { CountdownTimer };
