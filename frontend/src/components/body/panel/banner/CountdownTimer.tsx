import { useState, useEffect } from "react";

type CountdownTimerProps = {
	priority: number;
};

// some random hardcoded values in here, but it works.. for now :-)
function CountdownTimer({ priority }: CountdownTimerProps) {
	const getPriorityDuration = (priority: number) => {
		const baseDuration = 4.5;
		return baseDuration * priority;
	};

	const initialTime = getPriorityDuration(priority);
	const [timeLeft, setTimeLeft] = useState(initialTime);

	const progress = Math.max((timeLeft / initialTime) * 100, 0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setTimeLeft(initialTime);
	}, [priority, initialTime]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => Math.max(prevTime - 0.1, 0));
		}, 100);

		return () => clearInterval(timerId);
	}, [timeLeft, initialTime]);

	return (
		<div className="absolute bottom-0 left-0 right-0 w-full">
			<div className="ab h-[2px] w-full overflow-hidden rounded-full bg-sky-900">
				<div
					className="h-full bg-sky-200/50 transition-all duration-100 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}

export { CountdownTimer };
