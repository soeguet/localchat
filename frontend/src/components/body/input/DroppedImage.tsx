import { memo } from "react";
import { useImageStore } from "../../../stores/imageStore";
import { useTranslation } from "react-i18next";

const DroppedImage = memo(() => {
	const { t } = useTranslation();
	const droppedImage = useImageStore((state) => state.droppedImage);
	const setDroppedImage = useImageStore((state) => state.setDroppedImage);

	if (droppedImage === null) {
		return;
	}

	return (
		<>
			{droppedImage && (
				<>
					<div className="bg-gray-100 px-2">
						<div className="px-2 pt-2 text-sm font-bold">
							{t("picture_preview_label")}
						</div>
						<div className="flex items-center justify-between rounded-md p-2">
							<div className="flex flex-1 flex-col">
								<img
									className="max-h-32 w-auto object-contain"
									// src={`data:image/png;base64,${droppedImage}`}
									src={droppedImage}
									alt="SelectedImage"
								/>
							</div>
							<button
								type="button"
								className="ml-4 text-gray-500 hover:text-gray-700"
								onClick={() => setDroppedImage(null)}
							>
								<div className="hover:animate-spin">×</div>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
});

DroppedImage.displayName = "DroppedImage";

export { DroppedImage };
