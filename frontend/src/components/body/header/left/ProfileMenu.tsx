import { useEffect, useRef } from "react";
import { WindowReload } from "../../../../../wailsjs/runtime";
import { useTranslation } from "react-i18next";
import { ForceModal } from "../ForceModal";
import { useDoNotDisturbStore } from "../../../../stores/doNotDisturbStore";
import { InfoMenuButton } from "./InfoMenuButton";
import { handleClickOutsideOfDiv } from "../../../../utils/gui/handleClickOutsideOfDiv";
import { NewSettingsModalButton } from "./settings/body/button/NewSettingsModalButton";
import { DoNotDisturbIconSvg } from "../../../svgs/icons/DoNotDisturbIconSvg";
import { ReloadIconSvg } from "../../../svgs/icons/ReloadIconSvg";
import { BannerMenuButton } from "./BannerMenuButton";
import { useRefStore } from "../../../../stores/refStore";
import { useMenuStore } from "../../../../stores/menuStore";

function ProfileMenu() {
	const { t } = useTranslation();

	const menuRef = useRef<HTMLDivElement>(null);

	const setDoNotDisturb = useDoNotDisturbStore(
		(state) => state.setDoNotDisturb,
	);

	const menuOpen = useMenuStore((state) => state.menuOpen);
	const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

	useEffect(() => {
		if (menuRef.current !== null) {
			useRefStore.getState().setChatMenuRef(menuRef);
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (menuOpen) {
			document.addEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(menuRef, e, setMenuOpen),
			);
		}

		return () => {
			document.removeEventListener("mousedown", (e) =>
				handleClickOutsideOfDiv(menuRef, e, setMenuOpen),
			);
		};
	}, [menuOpen]);

	return (
		<>
			{menuOpen && (
				<div
					ref={menuRef}
					className={
						"fixed left-2 top-20 z-30 mr-12 mt-2 w-56 rounded-md border-2 bg-white py-1 shadow-xl"
					}>
					<NewSettingsModalButton />
					<InfoMenuButton />
					<BannerMenuButton />

					<button
						type="button"
						className="group flex w-full items-center gap-2 border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
						onClick={() =>
							setDoNotDisturb(
								!useDoNotDisturbStore.getState().doNotDisturb,
							)
						}>
						<div className="group-hover:animate-bounce">
							<DoNotDisturbIconSvg />
						</div>
						{t("menu_item_do_not_disturb")}
					</button>

					<ForceModal />

					<button
						type="button"
						className="group flex w-full items-center gap-2 border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
						onClick={() => WindowReload()}>
						<div className="group-hover:animate-spin">
							<ReloadIconSvg />
						</div>
						{t("menu_item_reload")}
					</button>
				</div>
			)}
		</>
	);
}

export { ProfileMenu };