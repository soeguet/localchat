import { useWebsocketStore } from "../../../../stores/websocketStore";
import { ConnectedSvg } from "../../../svgs/status/ConnectedSvg";
import { DisconnectedSvg } from "../../../svgs/status/DisconnectedSvg";
import { AvailabilityMode } from "./AvailabilityMode";
import { ReconnectButton } from "./ReconnectButton";

function HeaderMiddle() {
	const isConnected = useWebsocketStore((state) => state.isConnected);

	return (
		<div data-testid="header-middle">
			{isConnected ? (
				<div className="flex gap-2 items-center h-full">
					<AvailabilityMode />
					<ConnectedSvg />
				</div>
			) : (
				<div className="flex gap-2 items-center h-full">
					<DisconnectedSvg />
					<ReconnectButton />
				</div>
			)}
		</div>
	);
}

export { HeaderMiddle };
