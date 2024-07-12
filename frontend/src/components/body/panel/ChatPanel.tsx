import { useEffect, useRef } from "react";
import { MessageRenderMap } from "./MessageRenderMap";
import { useRefStore } from "../../../stores/refStore";
import { TopBanner } from "./banner/TopBanner";

function ChatPanel() {
	const chatBottomRef = useRef<HTMLDivElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const setChatContainerRef = useRefStore(
		(state) => state.setChatContainerRef,
	);
	const setChatBottomRef = useRefStore((state) => state.setChatBottomRef);

	// biome-ignore lint/correctness/useExhaustiveDependencies: only needed once
	useEffect(() => {
		setChatContainerRef(chatContainerRef);
		setChatBottomRef(chatBottomRef);
	}, []);

	return (
		<>
			<TopBanner />
			<div
				ref={chatContainerRef}
				className={"relative grow overflow-y-auto px-5 pb-2 pt-2"}>
				<MessageRenderMap />
				<div ref={chatBottomRef} className="h-2 bg-transparent" />
			</div>
		</>
	);
}

export { ChatPanel };
