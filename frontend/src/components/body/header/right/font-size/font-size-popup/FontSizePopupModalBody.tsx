import { type ReactNode, useRef } from "react";
import { useClosePopupOnClickEffect } from "../../../../../../hooks/popups/useClosePopupOnClickEffect";

type FontSizePopupModalBodyProps = {
	showPopup: boolean;
	setShowPopup: (show: boolean) => void;
	children: ReactNode;
};

function FontSizePopupModalBody(props: FontSizePopupModalBodyProps) {
	const fontSizeRef = useRef<HTMLDivElement>(null);
	useClosePopupOnClickEffect(props.showPopup, props.setShowPopup, fontSizeRef);
	return (
		<>
			{props.showPopup && (
				<div className="relative grid grid-rows-2 gap-4 text-black">
					<div
						data-testid="font-size-popup"
						ref={fontSizeRef}
						className="absolute justify-evenly flex-row w-96 h-48 right-3 top-16 z-20 -mt-2 rounded-lg border-2 border-black bg-white p-4 py-1 shadow-xl shadow-gray-600/50"
					>
						{props.children}
					</div>
				</div>
			)}
		</>
	);
}

export { FontSizePopupModalBody };
