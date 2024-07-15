import { useEffect, useState } from "react";
import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerDeleteSvg } from "../../../svgs/banner/BannerDeleteSvg";
import type { Hash } from "../../../../utils/customTypes";
import { BannerDeleteConfirmSvg } from "../../../svgs/banner/BannerDeleteConfirmSvg";
import { useTranslation } from "react-i18next";

type BannerDeleteProps = {
	id: Hash;
};

function BannerDelete(props: BannerDeleteProps) {
	const { t } = useTranslation();
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	function deleteOnClick() {
		if (!deleteConfirmation) {
			setDeleteConfirmation(true);
			return;
		}
		useBannerStore.getState().removeBanner(props.id);
	}

	useEffect(() => {
		if (deleteConfirmation) {
			const timeout = setTimeout(() => {
				setDeleteConfirmation(false);
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [deleteConfirmation]);

	return (
		<>
			<button
				type="button"
				onClick={deleteOnClick}
				className={`relative inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 ${deleteConfirmation && "animation-pulse"}`}>
				{deleteConfirmation && (
					<div className="absolute right-24 z-50 flex w-[12rem] translate-y-5 items-center gap-4 rounded-xl border-2 border-red-500 bg-red-50 p-2 text-black shadow-lg shadow-black/50">
						<div>
							<BannerDeleteSvg />
						</div>
						<div className="flex h-full flex-col items-start text-start text-gray-700">
							<p className="mb-2 text-sm">
								{t("banner_delete_confirm_1")}
							</p>
							<p className="mb-2 text-sm">
								{t("banner_delete_confirm_2")}
							</p>
							<p className="mb-2 text-sm">
								{t("banner_delete_confirm_3")}
							</p>
						</div>
					</div>
				)}
				{deleteConfirmation ? (
					<BannerDeleteConfirmSvg />
				) : (
					<BannerDeleteSvg />
				)}
			</button>
		</>
	);
}

export { BannerDelete };