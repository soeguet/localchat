import { useEffect, useRef } from "react";
import { useBannerStore } from "../../../../stores/bannerStore";
import { AddButton } from "../../../svgs/ui/AddButton";
import { CloseButton } from "../../../svgs/ui/CloseButton";
import { BannerVisibilityIcon } from "./BannerVisibilityIcon";
import { BannerEditSvg } from "../../../svgs/banner/BannerEditSvg";
import { BannerDeleteSvg } from "../../../svgs/banner/BannerDeleteSvg";
import { BannerDelete } from "./BannerDelete";

function BannerModal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const isOpen = useBannerStore((state) => state.bannerModalOpen);
	const setBannerModalOpen = useBannerStore(
		(state) => state.setBannerModalOpen,
	);
	const banners = useBannerStore((state) => state.banners);

	useEffect(() => {
		if (modalRef == null || modalRef.current === null) {
			return;
		}
		if (isOpen) {
			modalRef.current.showModal();
		} else if (modalRef.current.open) {
			modalRef.current.close();
		}
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<dialog
					ref={modalRef}
					className="relative h-2/3 w-2/3 rounded-xl bg-white backdrop:bg-black/50">
					<div
						className="absolute  right-1 top-0.5 cursor-pointer select-none text-center hover:animate-spin"
						onClick={() => setBannerModalOpen(false)}>
						<CloseButton
							title="close"
							titleId="close-banner-modal-button"
						/>
					</div>
					<div className="absolute right-14 top-1.5 cursor-pointer select-none text-center hover:animate-bounce">
						<AddButton />
					</div>
					<div className="m-3 rounded-xl pt-4">
						<table className="w-full table-auto text-sm">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900">
										title
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900">
										message
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900">
										priority
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left font-semibold text-gray-900">
										actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{banners.map((banner) => {
									const bannerHidden = banner.hidden;
									return (
										<tr
											key={banner.title}
											className={`${bannerHidden ? "text-red-400" : ""}`}>
											<td>{banner.title}</td>
											<td>{banner.message}</td>
											<td>{banner.priority}</td>
											<td className="flex justify-end">
												<button
													type="button"
													onClick={() => {
														useBannerStore
															.getState()
															.hideBanner(
																banner.id,
															);
													}}
													className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
													<BannerVisibilityIcon
														banner={banner}
													/>
												</button>
												<button
													type="button"
													className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
													<BannerEditSvg />
												</button>

												<BannerDelete id={banner.id} />
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</dialog>
			)}
		</>
	);
}

export { BannerModal };
