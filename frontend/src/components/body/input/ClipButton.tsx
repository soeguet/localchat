import { memo, useState } from "react";
import { AttachmentMenu } from "./picture/AttachmentMenu";
import { PaperClipSvg } from "../../svgs/input/PaperClipSvg";

const ClipButton = memo(() => {
	const [attachmentMenuVisible, setAttachmentMenuVisible] = useState(false);

	function handleClipClick(e) {
		e.preventDefault();
		setAttachmentMenuVisible(() => !attachmentMenuVisible);
	}

	return (
		<>
			<div
				className="h-full items-center flex cursor-pointer"
				onKeyUp={handleClipClick}
				onClick={handleClipClick}
			>
				<PaperClipSvg />
			</div>
			{attachmentMenuVisible && (
				<AttachmentMenu setAttachmentMenuVisible={setAttachmentMenuVisible} />
			)}
		</>
	);
});

ClipButton.displayName = "ClipButton";

export { ClipButton };
