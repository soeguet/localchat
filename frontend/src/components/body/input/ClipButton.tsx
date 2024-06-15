import { memo, useState } from "react";
import { AttachmentMenu } from "./picture/AttachmentMenu";
import { PaperClipSvg } from "../../svgs/input/PaperClipSvg";

const ClipButton = memo(() => {
	const [attachmentMenuVisible, setAttachmentMenuVisible] = useState(false);

	function handleClipClick() {
		setAttachmentMenuVisible(!attachmentMenuVisible);
	}

	return (
		<>
			<div
				className="h-full items-center flex cursor-pointer"
				onKeyUp={handleClipClick}
				onClick={handleClipClick}>
				<PaperClipSvg />
				{attachmentMenuVisible && (
					<div className="relative">
						<AttachmentMenu
							setAttachmentMenuVisible={setAttachmentMenuVisible}
						/>
					</div>
				)}
			</div>
		</>
	);
});

ClipButton.displayName = "ClipButton";

export { ClipButton };
