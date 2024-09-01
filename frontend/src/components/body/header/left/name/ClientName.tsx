import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../../../stores/clientStore";
import { useDoNotDisturbStore } from "../../../../../stores/doNotDisturbStore";
import { useUserStore } from "../../../../../stores/userStore";
import { Timer } from "../timer/Timer";

function ClientName() {
	const { t } = useTranslation();
	const clientDbId = useUserStore((state) => state.myId);
	const username = useClientStore(
		(state) => state.getClientById(clientDbId)?.clientUsername,
	);

	const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);

	return (
		<>
			{doNotDisturb ? (
				<div
					className="flex"
					data-testid="do-not-disturb-container">
					<span className="ml-3 font-medium mr-1">
						{t("header_do_not_disturb_label")}
					</span>
					<Timer />
				</div>
			) : (
				<span
					className="ml-3 font-medium"
					data-testid="clientname-span">
					{username}
				</span>
			)}
		</>
	);
}

export { ClientName };