import { useTranslation } from "react-i18next";
import { useImageStore } from "../../../../stores/imageStore";
import { CameraSvg } from "../../../svgs/input/CameraSvg";
import { useRef } from "react";

type AttachmentMenuProps = {
	setAttachmentMenuVisible: (visible: boolean) => void;
};
function AttachmentMenu(props: AttachmentMenuProps) {
	const { t } = useTranslation();
	const setSelectedImage = useImageStore((state) => state.setSelectedImage);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleLabelClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedImage(file);
			props.setAttachmentMenuVisible(false);
		}
	}
	return (
		<>
			<div className="absolute transform translate-x-12 -translate-y-14 z-50 mt-2 w-48 rounded-md border-2 border-gray-500 bg-white py-1 shadow-xl shadow-black/50">
				<div className="flex items-center gap-3 hover:bg-gray-100">
					<button
						type="button"
						className="px-4 py-2 w-full h-full flex gap-4 items-center text-center"
						onClick={handleLabelClick}
					>
						<CameraSvg />
						{t("menu_attachment_image")}
					</button>
					<input
						ref={fileInputRef}
						id="hiddenFileInput"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: "none" }}
					/>
				</div>
			</div>
		</>
	);
}

export { AttachmentMenu };
