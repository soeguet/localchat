import { memo, useState } from "react";
import { AttachmentMenu } from "./picture/AttachmentMenu";
import { PaperClipSvg } from "../../svgs/input/PaperClipSvg";
import { errorLogger } from "../../../logger/errorLogger";

const ClipButton = memo(() => {
	const [attachmentMenuVisible, setAttachmentMenuVisible] = useState(false);

	function handleClipClick(e) {
		// e.preventDefault();
		// setAttachmentMenuVisible(() => !attachmentMenuVisible);
		errorLogger.logError(new Error("ClipButton clicked"));
	}

	return (
		<>
			<div
				className="flex h-full cursor-pointer items-center"
				onKeyUp={handleClipClick}
				onClick={handleClipClick}>
				<PaperClipSvg />
			</div>
			{attachmentMenuVisible && (
				<AttachmentMenu
					setAttachmentMenuVisible={setAttachmentMenuVisible}
				/>
			)}
		</>
	);
});

ClipButton.displayName = "ClipButton";

export { ClipButton };
