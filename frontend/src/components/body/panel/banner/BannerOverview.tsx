import { useTranslation } from "react-i18next";
import { useBannerStore } from "../../../../stores/bannerStore";
import { BannerEditSvg } from "../../../svgs/banner/BannerEditSvg";
import { AddButton } from "../../../svgs/ui/AddButton";
import { CloseButton } from "../../../svgs/ui/CloseButton";
import { BannerDelete } from "./BannerDelete";
import { BannerVisibilityIcon } from "./BannerVisibilityIcon";
import {BannerObject, BannerPayload, PayloadSubType} from "../../../../utils/customTypes";

type BannerOverviewProps = {
	setBannerModalOpen: (show: boolean) => void;
	setAddBannerMode: (show: boolean) => void;
	setBannerObject: (bannerObject: BannerObject | null) => void;
};

function BannerOverview(props: BannerOverviewProps) {
	const { t } = useTranslation();
	const banners = useBannerStore((state) => state.banners);
	
	return (
		<>
			<div
				className="absolute  right-3 top-1 cursor-pointer select-none text-center hover:animate-spin"
				onClick={() => props.setBannerModalOpen(false)}>
				<CloseButton />
			</div>
			<div
				className="absolute right-14 top-2 flex cursor-pointer select-none items-center gap-2 text-center text-gray-600"
				onClick={() => props.setAddBannerMode(true)}>
				{t("label_add_banner")}
				<AddButton />
			</div>
			<div className="m-3 mt-11 h-[92%] overflow-y-scroll rounded-xl">
				<table className="w-full table-auto text-sm">
					<thead className="bg-gray-300">
						<tr>
							<th
								scope="col"
								className="border py-3.5 pl-4 pr-3 text-center font-semibold text-gray-900">
								{t("banner_overview_header_title")}
							</th>
							<th
								scope="col"
								className="border px-3 py-3.5 text-center font-semibold text-gray-900">
								{t("banner_overview_header_message")}
							</th>
							<th
								scope="col"
								className="border px-3 py-3.5 text-center font-semibold text-gray-900">
								{t("banner_overview_header_priority")}
							</th>
							<th
								scope="col"
								className="border px-3 py-3.5 text-center font-semibold text-gray-900">
								{t("banner_overview_header_actions")}
							</th>
						</tr>
					</thead>
					<tbody className="border bg-white">
						{banners.map((banner) => {
							const bannerHidden = banner.hidden;
							return (
								<tr
									key={banner.id}
									className={`${bannerHidden ? "text-red-400" : ""}`}>
									<td className="border text-center">
										{banner.title}
									</td>
									<td className="border text-center">
										{banner.message}
									</td>
									<td className="border text-center">
										{banner.priority}
									</td>
									<td className="border text-center">
										<button
											type="button"
											onClick={() => {
												useBannerStore
													.getState()
													.hideBanner(banner.id);
											}}
											className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
											<BannerVisibilityIcon
												banner={banner}
											/>
										</button>
										<button
											type="button"
											onClick={() => {
												props.setBannerObject(banner);
												props.setAddBannerMode(true);
											}}
											className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
											<BannerEditSvg />
										</button>

										<BannerDelete banner={banner} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

export { BannerOverview };