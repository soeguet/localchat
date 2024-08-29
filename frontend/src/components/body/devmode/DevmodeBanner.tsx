import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../stores/userStore";

function DevmodeBanner() {
	const { t } = useTranslation();
	const environment = useUserStore.getState().environment;

	return (
		<>
			{environment === "dev" && (
				<div className="absolute top-0 right-0 text-white text-sm bg-blue-700 p-2 opacity-80 pointer-events-none">
					{t("devmode_banner")}
				</div>
			)}
		</>
	);
}

export { DevmodeBanner };