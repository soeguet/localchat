import React, { memo, useState } from "react";
import { AttachmentMenu } from "./picture/AttachmentMenu";
import { PaperClipSvg } from "../../svgs/input/PaperClipSvg";

const ClipButton = memo(() => {
	const [attachmentMenuVisible, setAttachmentMenuVisible] = useState(false);

	function handleClipClick(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		setAttachmentMenuVisible(() => !attachmentMenuVisible);
	}

	return (
		<>
			<div
				className="flex h-full cursor-pointer items-center"
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