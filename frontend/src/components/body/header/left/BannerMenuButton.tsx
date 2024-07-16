import { useTranslation } from "react-i18next";
import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerIconSvg } from "../../../svgs/icons/BannerIconSvg";
import { useMenuStore } from "../../../../stores/menuStore";

function BannerMenuButton() {
	const { t } = useTranslation();
	const setBannerModalOpen = useBannerStore(
		(state) => state.setBannerModalOpen,
	);
	const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

	const openModal = () => {
		setBannerModalOpen(true);
		setMenuOpen(false);
	};

	return (
		<>
			<button
				type="button"
				data-testid="info-menu-modal-button"
				className="group flex w-full items-center gap-2 border-t-2 px-4 py-2 text-left align-middle text-sm text-gray-800 hover:bg-gray-100"
				onClick={openModal}>
				<div className="group-hover:animate-bounce">
					<BannerIconSvg />
				</div>
				{t("menu_item_banner")}
			</button>
		</>
	);
}

export { BannerMenuButton };
