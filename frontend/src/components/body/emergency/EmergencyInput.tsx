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
import { useEmergencyStore } from "../../../stores/emergencyStore";

function EmergencyInput() {
	const ws = useWebsocketStore((state) => state.ws);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (textAreaRef.current === null) {
			return;
		}

		const condition = textAreaRef.current.value;

		if (condition.length === 0) {
			return;
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleEmergencyChatSendMessage();
			textAreaRef.current.value = "";
		}
	}
	function handleEmergencyChatSendMessage() {
		if (ws === null) {
			throw new Error("Websocket connection is not available");
		}
		if (textAreaRef.current === null) {
			throw new Error("Textarea is not available");
		}

		const payload: EmergencyMessagePayload = {
			payloadType: PayloadSubType.emergencyMessage,
			emergencyChatId: useEmergencyStore.getState().emergencyChatId,
			messageDbId: generateSimpleId(),
			clientDbId: useUserStore.getState().myId,
			time: getTimeWithHHmmFormat(new Date()),
			message: utf8ToBase64(textAreaRef.current.value),
		};

		if (
			payload.emergencyChatId === "" ||
			payload.message === "" ||
			payload.clientDbId === "" ||
			payload.time === ""
		) {
			throw new Error("Payload is missing some data");
		}

		ws.send(JSON.stringify(payload));
		textAreaRef.current.value = "";
	}
	return (
		<>
			<div className="flex w-full gap-2 p-2">
				<textarea
					className="w-full rounded-lg border border-black/50 px-2 py-0.5"
					onKeyDown={handleKeyDown}
					ref={textAreaRef}
				/>
				<button
					type="button"
					className="flex h-full cursor-pointer items-center"
					onClick={handleEmergencyChatSendMessage}>
					<SendButtonSvg />
				</button>
			</div>
		</>
	);
}

export { EmergencyInput };
