import { useState, useEffect } from "react";

type CountdownTimerProps = {
	priority: number;
};

function CountdownTimer({ priority }: CountdownTimerProps) {
	const getPriorityDuration = (priority: number) => {
		// Adjust these values as needed
		const baseDuration = 5; // 5 seconds
		return baseDuration * priority;
	};

	const initialTime = getPriorityDuration(priority);
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		setTimeLeft(initialTime);
	}, [priority, initialTime]);

	useEffect(() => {
		if (timeLeft <= 0) return;

		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, [timeLeft]);

	const progress = (timeLeft / initialTime) * 100;

	return (
		<div className="w-full max-w-md">
			<div className="h-4 w-full rounded-full bg-gray-200">
				<div
					className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-linear"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
}

export { CountdownTimer };
