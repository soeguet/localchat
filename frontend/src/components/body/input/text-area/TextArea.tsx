import { useTranslation } from "react-i18next";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useReplyStore } from "../../../../stores/replyStore";
import { useUserStore } from "../../../../stores/userStore";
import { useImageStore } from "../../../../stores/imageStore";
import { errorLogger } from "../../../../logger/errorLogger";
import {DEFAULT_HOVER_COLOR} from "../../../../utils/variables/variables";

type TextAreaProps = {
	message: string;
	setMessage: (message: string) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

function TextArea(props: TextAreaProps) {
	const { t } = useTranslation();
	const [hoverState, setHoverState] = useState(false);
	const myColor = useUserStore((state) => state.myColor);

	const replyMessage = useReplyStore((state) => state.replyMessage);
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);


	const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const clipboardData = event.clipboardData;
		const items = clipboardData.items;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.kind === 'file' && item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (file) {
					const reader = new FileReader();
					reader.onload = (e) => {
						const base64String = reader.result as string;
						useImageStore.getState().setDroppedImage(base64String);
					};
					reader.readAsDataURL(file);
				}
			} else if (item.kind === 'string' && item.type === 'text/html') {
				item.getAsString((html) => {
					const imgSrcRegex = /<img.*?src=["'](.*?)["']/;
					const match = imgSrcRegex.exec(html);
					if (match && match[1]) {
						const base64String = match[1]
						useImageStore.getState().setDroppedImage(base64String);
					}
				});
			}
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		setHoverState(false);
		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			const file = files[0];
			const imageTypes = [
				"image/png",
				"image/jpeg",
				"image/gif",
				"image/bmp",
				"image/webp",
			];
			if (imageTypes.includes(file.type)) {
				const reader = new FileReader();
				reader.onload = () => {
					const base64String = reader.result as string;
					useImageStore.getState().setDroppedImage(base64String);
				};
				reader.readAsDataURL(file);
			} else {
				console.error("Only image files are supported.");
				errorLogger.logError(new Error("Only image files are supported."));
			}
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (hoverState) return;
		setHoverState(true);
	};

	useEffect(() => {
		if (replyMessage) {
			textAreaRef.current?.focus();
		}
	}, [replyMessage]);

	const placeholderText = hoverState
		? t("textarea_placeholder_image_drop_here")
		: t("chat_input_placeholder");

	const textAreaRingColor = myColor ? myColor : DEFAULT_HOVER_COLOR;

	return (
		<>
      <textarea
		  className={`w-full h-full p-4 transition-all duration-300 ease-in-out
                    border-2 rounded-lg resize-none
                    ${
			  hoverState
				  ? "bg-green-50 border-green-500 text-green-700 shadow-inner flex justify-center items-center text-center h-auto w-auto"
				  : "bg-white border-gray-300 text-gray-700"
		  }
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
		  // @ts-ignore
		  style={{ "--tw-ring-color": textAreaRingColor }}
		  placeholder={placeholderText}
		  ref={textAreaRef}
		  rows={2}
		  value={props.message}
		  onPaste={handlePaste}
		  onChange={(e) => {
			  props.setMessage(e.target.value);
		  }}
		  onKeyDown={props.handleKeyDown}
		  onMouseLeave={() => {
			  setHoverState(false);
		  }}
		  onDragLeave={() => {
			  setHoverState(false);
		  }}
		  onDrop={handleDrop}
		  onDragOver={handleDragOver}
	  />
		</>
	);
}

export { TextArea };