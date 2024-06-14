import { useEffect, useRef } from "react";
import { WindowReload } from "../../../../../wailsjs/runtime";
import { useTranslation } from "react-i18next";
import { ForceModal } from "../ForceModal";
import { useDoNotDisturbStore } from "../../../../stores/doNotDisturbStore";
import { InfoMenuButton } from "./InfoMenuButton";
import { handleClickOutsideOfDiv } from "../../../../utils/handleClickOutsideOfDiv";
import { NewSettingsModalButton } from "./settings/body/button/NewSettingsModalButton";
import { ForceIconSvg } from "../../../svgs/icons/ForceIconSvg";
import { DoNotDisturbIconSvg } from "../../../svgs/icons/DoNotDisturbIconSvg";
import { ReloadIconSvg } from "../../../svgs/icons/ReloadIconSvg";

type ProfileMenuPropsType = {
	showMenu: boolean;
	setShowMenu: (show: boolean) => void;
};

function ProfileMenu(props: ProfileMenuPropsType) {
	const { t } = useTranslation();

	const menuRef = useRef<HTMLDivElement>(null);

	const setDoNotDisturb = useDoNotDisturbStore(
		(state) => state.setDoNotDisturb
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (props.showMenu) {
			document.addEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(menuRef, e, props.setShowMenu)
			);
		}

		return () => {
			document.removeEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(menuRef, e, props.setShowMenu)
			);
		};
	}, [props.showMenu]);

	return (
		<>
			{props.showMenu && (
				<div
					ref={menuRef}
					className={
						"fixed left-2 top-20 z-20 mr-12 mt-2 w-56 rounded-md border-2 bg-white py-1 shadow-xl"
					}>
					<NewSettingsModalButton />
					<InfoMenuButton />

					<button
						type="button"
						className="flex gap-2 items-center w-full border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
						onClick={() =>
							setDoNotDisturb(
								!useDoNotDisturbStore.getState().doNotDisturb
							)
						}>
						<DoNotDisturbIconSvg />
						{t("menu_item_do_not_disturb")}
					</button>

					<ForceModal />

					<button
						type="button"
						className="flex gap-2 items-center w-full border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
						onClick={() => WindowReload()}>
						<ReloadIconSvg />
						{t("menu_item_reload")}
					</button>
				</div>
			)}
		</>
	);
}

export { ProfileMenu };
