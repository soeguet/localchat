import { useClientStore } from "../../../stores/clientStore";
import { useTypingStore } from "../../../stores/typingStore";
import "./TypingIndicator.css";
import { useEffect, useRef, useState } from "react";

/**
 * Represents a typing indicator that displays who is currently typing.
 *
 * @return {JSX.Element} The typing indicator component.
 */
function TypingIndicator(): JSX.Element {
	const [isHovered, setIsHovered] = useState(false);

	const typingUsers: string[] = useTypingStore(
		(state) => state.typingClientIds,
	);

	const typingUserNames: string[] = typingUsers.map((id) => {
		return (
			useClientStore.getState().getClientById(id)?.clientUsername ||
			"Unknown"
		);
	});

	const names = typingUserNames.join(", ");
	const text = typingUserNames.length > 1 ? "are typing" : "is typing";
	const typingIndicatorRef = useRef<HTMLDivElement>(null);

	// add hover listener to "typing" indicator panel so user can see text beneath a little better
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typingIndicatorRef.current) {
			typingIndicatorRef.current.addEventListener("mouseenter", () => {
				setIsHovered(true);
			});
			typingIndicatorRef.current.addEventListener("mouseleave", () => {
				setIsHovered(false);
			});
		}
		return () => {
			if (typingIndicatorRef.current) {
				typingIndicatorRef.current.removeEventListener(
					"mouseenter",
					() => {
						setIsHovered(true);
					},
				);
				typingIndicatorRef.current.removeEventListener(
					"mouseleave",
					() => {
						setIsHovered(false);
					},
				);
			}
		};
	}, [typingUserNames.length]);

	return (
		<>
			{typingUserNames.length > 0 && (
				<div className="relative max-h-0 -translate-y-10">
					<div
						ref={typingIndicatorRef}
						data-testid="typing-indicator-container"
						className="sticky bottom-0 left-0 right-0 top-full z-50 mx-auto mb-1 w-max max-w-xs transform rounded-lg border border-black bg-gray-200 p-2 text-xs shadow"
						style={{
							opacity: isHovered ? 0.3 : 0.7,
							transition: "opacity 0.3s",
						}}>
						<div className="flex items-center">
							<div className="flex overflow-hidden text-black">
								{names} {text}
								<div className="ml-1">
									<span className="dots dot1">.</span>
									<span className="dots dot2">.</span>
									<span className="dots dot3">.</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export { TypingIndicator };