import { t } from "i18next";
import { WindowReloadApp } from "../../../../wailsjs/runtime/runtime";
import Connected from "../../svgs/status/Connected";
import Disconnected from "../../svgs/status/Disconnected";
import useWebsocketStore from "../../../stores/websocketStore";

function HeaderMiddle() {
    const ws = useWebsocketStore((state) => state.ws);

    return (
        <div>
            {ws?.readyState === ws?.OPEN ? (
                <div className="rounded-full border-2 border-black">
                    <Connected />
                </div>
            ) : (
                <div className="flex">
                    <Disconnected />
                    <button
                        onClick={() => WindowReloadApp()}
                        className="ml-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                    >
                        {t("button_reconnect")}
                    </button>
                </div>
            )}
        </div>
    );
}

export default HeaderMiddle;
