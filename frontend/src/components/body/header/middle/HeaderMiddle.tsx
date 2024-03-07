import useWebsocketStore from "../../../../stores/websocketStore";
import ConnectedSvg from "../../../svgs/status/ConnectedSvg";
import DisconnectedSvg from "../../../svgs/status/DisconnectedSvg";
import ReconnectButton from "./ReconnectButton";

function HeaderMiddle() {
    const ws = useWebsocketStore((state) => state.ws);

    return (
        <div>
            {ws?.readyState === ws?.OPEN ? (
                <ConnectedSvg />
            ) : (
                <div className="flex">
                    <DisconnectedSvg />
                    <ReconnectButton />
                </div>
            )}
        </div>
    );
}

export default HeaderMiddle;
