import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";

type DeletedMessageProps = {
	clientDbId: string;
	thisMessageFromThisClient: boolean;
};
function DeletedMessage(props: DeletedMessageProps) {
	const { t } = useTranslation();
	const clientColor = useClientStore(
		(state) =>
			state.clients.filter(
				(client) => client.clientDbId === props.clientDbId
			)[0].clientColor
	);
	const messageOnWhichSideAligned = `${
		props.thisMessageFromThisClient ? "justify-end pr-16" : "pl-16"
	}`;
	return (
		<>
			<div
				className={`${messageOnWhichSideAligned} flex py-3 mx-5 text-white`}>
				<div
					className="p-3 rounded-lg"
					style={{
						backgroundColor: clientColor,
						opacity: "0.5",
					}}>
					{t("deleted_message")}
				</div>
			</div>
		</>
	);
}

export { DeletedMessage };
