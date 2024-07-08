import { useTranslation } from "react-i18next";
import { useUnseenMessageCountStore } from "../../../stores/unseenMessageCountStore";
import { ScrollSymbolSvg } from "../../svgs/scroll/ScrollSymbolSvg";

type UnreadMessagesBelowBannerProps = {
	thisIsTheFirstUnreadMessage: boolean;
};

function UnreadMessagesBelowBanner(props: UnreadMessagesBelowBannerProps) {
	const { t } = useTranslation();
	const unreadMessagesCount = useUnseenMessageCountStore(
		(state) => state.unseenMessagesIdList.length,
	);

	return (
		<>
			{props.thisIsTheFirstUnreadMessage && (
				<div className="mx-5 my-3 flex grow items-center justify-center rounded-md border border-black bg-gray-400 p-2 text-justify text-lg font-semibold text-white shadow-lg">
					<ScrollSymbolSvg />{" "}
					<div className="mx-5">
						{unreadMessagesCount} {t("unread_messages_count")} :{" "}
						{t("below_unread_messages_start")}{" "}
					</div>
					<ScrollSymbolSvg />
				</div>
			)}
		</>
	);
}

export { UnreadMessagesBelowBanner };
