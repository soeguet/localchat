import { useTranslation } from "react-i18next";
import { WindowReloadApp } from "../../../../../wailsjs/runtime";

function ReconnectButton() {
	const { t } = useTranslation();

	return (
		<button
			type="button"
			data-testid="reconnect-button"
			onClick={() => WindowReloadApp()}
			className="ml-2 rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700">
			{t("button_reconnect")}
		</button>
	);
}

export { ReconnectButton };

