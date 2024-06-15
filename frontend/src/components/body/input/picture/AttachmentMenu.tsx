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

	const fileInputRef = useRef(null);

	const handleLabelClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("handleImageChange");
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedImage(file);
			props.setAttachmentMenuVisible(false);
		}
	}
	return (
		<>
			<div className="absolute -top-24 -left-10 z-50 mt-2 w-48 rounded-md border-2 border-gray-500 bg-white py-1 shadow-xl shadow-black/50">
				{/* button alternative */}

				<div className="flex gap-3 items-center hover:bg-gray-100">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<label
						htmlFor="hiddenFileInput"
						className="flex items-center gap-3 cursor-pointer w-full px-4 py-1"
						onClick={handleLabelClick}>
						<CameraSvg />
						{t("menu_attachment_image")}
					</label>
					<input
						ref={fileInputRef}
						id="hiddenFileInput"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: "none" }}
					/>
				</div>

				{/* button alternative */}
			</div>
		</>
	);
}

export { AttachmentMenu };
