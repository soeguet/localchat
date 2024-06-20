import { useRef } from "react";
import { useUserStore } from "../../../stores/userStore";
import { useWebsocketStore } from "../../../stores/websocketStore";
import {
	type EmergencyMessagePayload,
	PayloadSubType,
} from "../../../utils/customTypes";
import { utf8ToBase64 } from "../../../utils/encoder";
import { generateSimpleId } from "../../../utils/functionality";
import { getTimeWithHHmmFormat } from "../../../utils/time";
import { SendButtonSvg } from "../../svgs/input/SendButtonSvg";

function EmergencyInput() {
	const ws = useWebsocketStore((state) => state.ws);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	function handleEmergencyChatSendMessage() {
		if (ws === null) {
			throw new Error("Websocket connection is not available");
		}
		if (textAreaRef.current === null) {
			throw new Error("Textarea is not available");
		}
		const payload: EmergencyMessagePayload = {
			payloadType: PayloadSubType.emergencyMessage,
			emergencyChatId: generateSimpleId(),
			messageDbId: generateSimpleId(),
			clientDbId: useUserStore.getState().myId,
			time: getTimeWithHHmmFormat(new Date()),
			message: utf8ToBase64(textAreaRef.current?.value),
		};

		ws.send(JSON.stringify(payload));
	}
	return (
		<>
			<div className="flex w-full gap-2 p-2">
				<textarea
					className="w-full rounded-lg border border-black/50 px-2 py-0.5"
					ref={textAreaRef}
				/>
				<div
					className="flex h-full cursor-pointer items-center"
					onClick={handleEmergencyChatSendMessage}>
					<SendButtonSvg />
				</div>
			</div>
		</>
	);
}

export { EmergencyInput };