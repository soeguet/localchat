import type { MessagePayload } from "../../../../../utils/customTypes";

type PictureBubblePanelProps = {
	messagePayload: MessagePayload;
};

function PictureBubblePanel(props: PictureBubblePanelProps) {
	if (
		props.messagePayload.imageType?.data === undefined ||
		props.messagePayload.imageType?.data === null ||
		props.messagePayload.imageType.data === ""
	) {
		return;
	}

	return (
		<>
			<div className="flex h-full w-full items-center justify-center rounded-lg border-x-4 border-gray-200 bg-white/60 px-5 py-1">
				<img
					src={props.messagePayload.imageType.data}
					alt="message"
					className="max-h-[15rem] w-auto h-auto max-w-[30rem] object-contain"
				/>
			</div>
		</>
	);
}

export default PictureBubblePanel;
