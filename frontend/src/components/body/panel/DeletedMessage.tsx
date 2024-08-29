import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import type { ClientId } from "../../../utils/types/customTypes";
import {DEFAULT_HOVER_COLOR} from "../../../utils/variables/variables";

type DeletedMessageProps = {
	clientDbId: ClientId;
	thisMessageFromThisClient: boolean;
};
function DeletedMessage(props: DeletedMessageProps) {
	const { t } = useTranslation();
	const clientColor = useClientStore(
		(state) =>
			state.clients.filter(
				(client) => client.clientDbId === props.clientDbId,
			)[0].clientColor,
	);
	const messageOnWhichSideAligned = `${
		props.thisMessageFromThisClient ? "justify-end pr-16" : "pl-16"
	}`;
	return (
		<>
			<div className={`${messageOnWhichSideAligned} mx-5 flex py-3 text-white`}>
				<div
					className="rounded-lg p-3"
					style={{
						backgroundColor: clientColor ?? DEFAULT_HOVER_COLOR,
						opacity: "0.5",
					}}
				>
					{t("deleted_message")}
				</div>
			</div>
		</>
	);
}

export { DeletedMessage };