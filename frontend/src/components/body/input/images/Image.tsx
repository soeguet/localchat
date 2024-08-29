import { memo } from "react";
import { useImageStore } from "../../../../stores/imageStore";

const Image = memo(() => {
	const selectedImage = useImageStore((state) => state.selectedImage);
	const setSelectedImage = useImageStore((state) => state.setSelectedImage);

	if (selectedImage === null) {
		return;
	}

	return (
		<>
			{selectedImage && (
				<>
					<div className="bg-gray-100 px-2">
						<div className="px-2 pt-2 text-sm font-bold">
							picture preview
						</div>
						<div className="flex items-center justify-between rounded-md p-2">
							<div className="flex flex-1 flex-col">
								<img
									className="size-32"
									src={URL.createObjectURL(selectedImage)}
									alt="SelectedImage"
								/>
							</div>
							<button
								type="button"
								className="ml-4 text-gray-500 hover:text-gray-700"
								onClick={() => setSelectedImage(null)}>
								<div className="hover:animate-spin">×</div>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
});

Image.displayName = "Image";

export { Image };