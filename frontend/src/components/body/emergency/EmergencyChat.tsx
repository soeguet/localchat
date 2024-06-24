import { useEmergencyStore } from "../../../stores/emergencyStore";
import { useEffect, useRef } from "react";
import { EmergencyInitBanner } from "./EmergencyInitBanner";
import { EmergencyMessageOnPanel } from "./messages/EmergencyMessageOnPanel";

function EmergencyChat() {
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const emergencyMessages = useEmergencyStore(
		(state) => state.emergencyMessages,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const container = chatContainerRef.current;
		if (container === null) {
			return;
		}
		container.scrollTop = container.scrollHeight;
	}, [emergencyMessages, chatContainerRef]);

	return (
		<>
			<div
				ref={chatContainerRef}
				className="h-full w-full overflow-y-scroll border-0 px-3">
				{/* for the first 3 messages only */}
				<EmergencyInitBanner />
				{/* actual messages */}
				{emergencyMessages.map((message) => {
					return (
						<EmergencyMessageOnPanel
							key={message.messageDbId}
							message={message}
						/>
					);
				})}
			</div>
		</>
	);
}

export { EmergencyChat };
