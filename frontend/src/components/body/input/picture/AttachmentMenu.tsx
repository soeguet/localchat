import { useTranslation } from "react-i18next";
import { useImageStore } from "../../../../stores/imageStore";

type AttachmentMenuProps = {
    setAttachmentMenuVisible: (visible: boolean) => void;
};
function AttachmentMenu(props: AttachmentMenuProps) {
    const { t } = useTranslation();
    const setSelectedImage = useImageStore((state) => state.setSelectedImage);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
            props.setAttachmentMenuVisible(false);
        }
    }
    return (
        <>
            <div className="absolute -top-32 left-10 z-50 mt-2 w-48 rounded-md border-2 border-gray-500 bg-white py-1 shadow-xl shadow-black/50">
                <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                    {t("menu_attachment_image")}
                </button>
            </div>
            <div className="absolute -top-32 left-10 z-50 mt-2 w-48 rounded-md border-2 border-gray-500 bg-white py-1 shadow-xl shadow-black/50">
                <label
                    htmlFor="image-picker"
                    className="block w-full cursor-pointer px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                >
                    {t("menu_attachment_image")}
                </label>
                <input
                    id="image-picker"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
        </>
    );
}

export { AttachmentMenu };
