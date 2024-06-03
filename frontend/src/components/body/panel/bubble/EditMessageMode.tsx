import { useState } from "react";
import {
    PayloadSubType,
    type MessagePayload,
} from "../../../../utils/customTypes";
import { base64ToUtf8, utf8ToBase64 } from "../../../../utils/encoder";
import { useWebsocketStore } from "../../../../stores/websocketStore";

type EditMessageModeProps = {
    messagePayload: MessagePayload;
    setEnableMessageEditingMode: (enable: boolean) => void;
};
function EditMessageMode(props: EditMessageModeProps) {
    const [message, setMessage] = useState(
        base64ToUtf8(props.messagePayload.messageType.messageContext)
    );

    function onChangedMessageSubmit() {
        // send the message to the server
        const ws = useWebsocketStore.getState().ws;
        const base64Message = utf8ToBase64(message);
        const payload = {
            payloadType: PayloadSubType.edit,
            messageDbId: props.messagePayload.messageType.messageDbId,
            messageContext: base64Message,
        };

        if (!ws) {
            throw new Error("Websocket connection is not available");
        }
        ws.send(JSON.stringify(payload));
        props.setEnableMessageEditingMode(false);
    }

    return (
        <>
            <div className="bg-gray-300/90 text-black shadow-xl rounded-xl ">
                <div className="px-3 pt-2">
                    <textarea
                        className="w-full peer=hover/edit:animate-pulse h-20 p-2 rounded-xl bg-white/90 text-black"
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                    />
                </div>

                <div className="flex justify-center gap-3 text-xs p-2">
                    <button
                        type="button"
                        onClick={onChangedMessageSubmit}
                        onKeyDown={onChangedMessageSubmit}
                        className="p-2 px-3 bg-emerald-700 text-white rounded-xl">
                        SAVE
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            props.setEnableMessageEditingMode(false);
                        }}
                        onKeyDown={() => {
                            props.setEnableMessageEditingMode(false);
                        }}
                        className="p-2 px-3 bg-amber-700 rounded-xl text-white">
                        CANCEL
                    </button>
                </div>
            </div>
        </>
    );
}

export { EditMessageMode };
