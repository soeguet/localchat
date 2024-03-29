import useWebsocketStore from "../../../../stores/websocketStore";
import ConnectedSvg from "../../../svgs/status/ConnectedSvg";
import DisconnectedSvg from "../../../svgs/status/DisconnectedSvg";
import ReconnectButton from "./ReconnectButton";

function HeaderMiddle() {
    const isConnected = useWebsocketStore((state) => state.isConnected);

    return (
        <div data-testid="header-middle">
            {isConnected ?
                <ConnectedSvg />
                :
                <div className="flex">
                    <DisconnectedSvg />
                    <ReconnectButton />
                </div>
            }
        </div>
    );
}

export default HeaderMiddle;
