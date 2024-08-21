import { useEffect, useRef, useState } from "react";
import { BannerOverview } from "./BannerOverview";
import { AddNewBannerContainer } from "./AddNewBannerContainer";
import type { BannerObject } from "../../../../utils/types/customTypes";
import { useBannerStore } from "../../../../stores/bannerStore";

type BannerModalProps = {
	isBannerModalOpen: boolean;
};

function BannerModal(props: BannerModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null);
	const setBannerModalOpen = useBannerStore(
		(state) => state.setBannerModalOpen,
	);
	const [addBannerMode, setAddBannerMode] = useState(false);
	const [bannerObject, setBannerObject] = useState<BannerObject | null>(null);

	useEffect(() => {
		if (modalRef == null || modalRef.current === null) {
			return;
		}
		if (props.isBannerModalOpen) {
			modalRef.current.showModal();
		} else if (modalRef.current.open) {
			modalRef.current.close();
		}
	}, [props.isBannerModalOpen]);

	return (
		<>
			{props.isBannerModalOpen && (
				<dialog
					ref={modalRef}
					className="relative h-2/3 w-2/3 overflow-hidden rounded-xl bg-white backdrop:bg-black/50"
				>
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