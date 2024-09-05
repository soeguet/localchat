import { ImageViewer } from "../../../../../../wailsjs/go/main/App";
import type { MessagePayload } from "../../../../../utils/types/customTypes";

type PictureBubblePanelProps = {
	messagePayload: MessagePayload;
};

function PictureBubblePanel(props: PictureBubblePanelProps) {

	if (!props.messagePayload.imageType?.data) {
		return;
	}

	const handleRightClick = (e: React.MouseEvent) => {
		e.preventDefault();

		if (!props.messagePayload.imageType?.data) {
			return;
		}
		console.log("right click");
		// Create a link to the base64 image
		const link = document.createElement("a");
		link.href = props.messagePayload.imageType.data;
		link.download = "image.png"; // You can customize the filename and extension
		link.target = "_blank"; // Open in a new tab if necessary
		link.click(); // Simulate a click to trigger the download or open
	};

	const viewImageOnOs = () => {

		if (!props.messagePayload.imageType?.data) {
			return
		}

		ImageViewer(props.messagePayload.imageType.data);
	};

	return (
		<>
			<div
				className="flex h-full w-full items-center justify-center rounded-lg border-x-4 border-gray-200 bg-white/60 px-5 py-1"
				onContextMenu={handleRightClick}
			>
				<img
					src={props.messagePayload.imageType.data}
					alt="message"
					className="h-auto max-h-[15rem] w-auto max-w-[23rem] object-contain"
					onClick={() => viewImageOnOs()}
				/>
			</div>
		</>
	);
}

export default PictureBubblePanel;
