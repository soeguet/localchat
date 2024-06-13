import { useUserStore } from "../../../../stores/userStore";
import { useWebsocketStore } from "../../../../stores/websocketStore";
import { AvailabilitySvg } from "../../../svgs/header/AvailabilitySvg";
import { ConnectedSvg } from "../../../svgs/status/ConnectedSvg";
import { DisconnectedSvg } from "../../../svgs/status/DisconnectedSvg";
import { ReconnectButton } from "./ReconnectButton";

function HeaderMiddle() {
	const isConnected = useWebsocketStore((state) => state.isConnected);
	const availability = useUserStore((state) => state.availability);

	return (
		<div data-testid="header-middle">
			{isConnected ? (
				<div className="flex">
					{availability && <AvailabilitySvg />}
					<ConnectedSvg />
				</div>
			) : (
				<div className="flex">
					<DisconnectedSvg />
					<ReconnectButton />
				</div>
			)}
		</div>
	);
}

export { HeaderMiddle };

