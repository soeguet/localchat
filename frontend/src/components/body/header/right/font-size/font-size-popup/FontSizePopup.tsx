import { useFontSizeStore } from "../../../../../../stores/fontSizeStore";
import { FontSizeAdjustButton } from "../font-size-elements/FontSizeAdjustButton";
import { useSetFontSizeLocalStorage } from "../../flag/hooks/useSetFontSizeLocalStorage";
import { FontSizePopupHeader } from "./FontSizePopupHeader";
import { FontSizePopupModalBody } from "./FontSizePopupModalBody";

type FontSizePopupProps = {
	showPopup: boolean;
	setShowPopup: (show: boolean) => void;
};

const FontSizePopup = (props: FontSizePopupProps) => {
	const { fontSize, setFontSize } = useFontSizeStore();

	useSetFontSizeLocalStorage(fontSize);

	return (
		<>
			<FontSizePopupModalBody
				showPopup={props.showPopup}
				setShowPopup={props.setShowPopup}
			>
				<div className="size-full flex flex-col justify-between">
					<FontSizePopupHeader fontSize={fontSize} />
					<div className="mb-2 flex items-center justify-start gap-2">
						<FontSizeAdjustButton
							onClick={() => setFontSize(fontSize - 1 < 12 ? 12 : fontSize - 1)}
						>
							-
						</FontSizeAdjustButton>

						<input
							type="range"
							min="12"
							max="24"
							value={fontSize}
							onChange={(e) => setFontSize(Number(e.target.value))}
							className="w-full cursor-pointer"
						/>

						<FontSizeAdjustButton
							onClick={() => setFontSize(fontSize + 1 > 24 ? 24 : fontSize + 1)}
						>
							+
						</FontSizeAdjustButton>

						<button
							type="button"
							onClick={() => props.setShowPopup(false)}
							className="p-2 hover:animate-spin hover:text-amber-700"
						>
							🗙
						</button>
					</div>
				</div>
			</FontSizePopupModalBody>
		</>
	);
};

export { FontSizePopup };
