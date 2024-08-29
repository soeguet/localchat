import { memo } from "react";
import { SendButtonSvg } from "../../../svgs/input/SendButtonSvg";

type SendButtonProps = {
	handleSendMessage: () => void;
	sendTypingStatus: (status: boolean) => void;
};

const SendButton = memo(
	({ handleSendMessage, sendTypingStatus }: SendButtonProps) => {
		return (
			<div
				className="flex h-full cursor-pointer items-center"
				onClick={() => {
					handleSendMessage();
					sendTypingStatus(false);
				}}
				onKeyDown={() => {
					handleSendMessage();
					sendTypingStatus(false);
				}}
			>
				<SendButtonSvg />
			</div>
		);
	},
);

SendButton.displayName = "SendButton";

export { SendButton };