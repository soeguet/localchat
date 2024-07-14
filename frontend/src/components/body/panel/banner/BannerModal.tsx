import { useEffect, useRef, useState } from "react";
import {
	type BannerObject,
	useBannerStore,
} from "../../../../stores/bannerStore";
import { BannerOverview } from "./BannerOverview";
import { AddNewBannerContainer } from "./AddNewBannerContainer";

function BannerModal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const isOpen = useBannerStore((state) => state.bannerModalOpen);
	const setBannerModalOpen = useBannerStore(
		(state) => state.setBannerModalOpen,
	);
	const [addBannerMode, setAddBannerMode] = useState(false);
	const [bannerObject, setBannerObject] = useState<BannerObject | null>(null);

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
					className="relative h-2/3 w-2/3 overflow-hidden rounded-xl bg-white backdrop:bg-black/50">
					{addBannerMode ? (
						<AddNewBannerContainer
							setAddBannerMode={setAddBannerMode}
							setBannerObject={setBannerObject}
							{...(bannerObject ? { bannerObject } : {})}
						/>
					) : (
						<BannerOverview
							setBannerModalOpen={setBannerModalOpen}
							setAddBannerMode={setAddBannerMode}
							setBannerObject={setBannerObject}
						/>
					)}
				</dialog>
			)}
		</>
	);
}

export { BannerModal };
