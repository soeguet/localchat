import { useTranslation } from "react-i18next";
import { useImageStore } from "../../../../stores/imageStore";
import { CameraSvg } from "../../../svgs/input/CameraSvg";
import React, { useRef } from "react";

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
		// TODO change this to base64 and store it as that!
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedImage(file);
			props.setAttachmentMenuVisible(false);
		}
	}
	return (
		<>
			<div className="absolute z-50 mt-2 w-48 -translate-y-14 translate-x-12 transform rounded-md border-2 border-gray-500 bg-white py-1 shadow-xl shadow-black/50">
				<div className="flex items-center gap-3 hover:bg-gray-100">
					<button
						type="button"
						className="flex h-full w-full items-center gap-4 px-4 py-2 text-center"
						onClick={handleLabelClick}>
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