import { useEffect, useRef } from "react";
import { useBannerStore } from "../../../../stores/bannerStore";
import { AddButton } from "../../../svgs/ui/AddButton";
import { CloseButton } from "../../../svgs/ui/CloseButton";

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
						<table className="w-full">
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
								</tr>
							</thead>
							<tbody className="bg-white">
								{banners.map((banner) => {
									return (
										<tr key={banner.title}>
											<td>{banner.title}</td>
											<td>{banner.message}</td>
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
