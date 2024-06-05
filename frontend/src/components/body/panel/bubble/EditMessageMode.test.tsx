import { expect, test, describe } from "vitest";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../../../utils/test-utils";
import { App } from "../../../../App";
import { useMessageMapStore } from "../../../../stores/messageMapStore";
import {
    type MessagePayload,
    PayloadSubType,
} from "../../../../utils/customTypes";
import { ChatPanel } from "../ChatPanel";
import { useUserStore } from "../../../../stores/userStore";

describe("EditMessageMode", () => {
    test("test if edit mode activates after pressing edit", async () => {
        const id = "111";
        const messagePayload: MessagePayload = {
            payloadType: PayloadSubType.message,
            clientType: {
                clientDbId: id,
            },
            messageType: {
                deleted: false,

                messageDate: "2021-10-10",
                messageTime: "12:00",
                messageContext: "aGVubG8=",
                messageDbId: "111",
                edited: false,
            },
            quoteType: undefined,
            reactionType: [],
        };

        useMessageMapStore.getState().onMessage(messagePayload);
        useUserStore.getState().setMyId(id);
        useUserStore.getState().setMyUsername("TestUser");
        render(<ChatPanel />);

        const menuContainer = await screen.findByTestId(
            "chat-message-outer-part-container"
        );

        waitFor(() => {
            fireEvent.click(menuContainer);
        });

        const editButton = await screen.findByTestId("edit-message-button");

        waitFor(() => {
            fireEvent.click(editButton);
        });

        const container = await screen.findByTestId("edit-message-textarea");

        expect(container).toBeInTheDocument();
    });
});

// import { useState } from "react";
// import {
//     PayloadSubType,
//     type MessagePayload,
// } from "../../../../utils/customTypes";
// import { base64ToUtf8, utf8ToBase64 } from "../../../../utils/encoder";
// import { useWebsocketStore } from "../../../../stores/websocketStore";
// import { useTranslation } from "react-i18next";
//
// type EditMessageModeProps = {
//     messagePayload: MessagePayload;
//     setEnableMessageEditingMode: (enable: boolean) => void;
// };
// function EditMessageMode(props: EditMessageModeProps) {
//     const { t } = useTranslation();
//     const [message, setMessage] = useState(
//         base64ToUtf8(props.messagePayload.messageType.messageContext)
//     );
//
//     function onChangedMessageSubmit() {
//         // send the message to the server
//         const ws = useWebsocketStore.getState().ws;
//         const base64Message = utf8ToBase64(message);
//         const payload = {
//             payloadType: PayloadSubType.edit,
//             messageDbId: props.messagePayload.messageType.messageDbId,
//             messageContext: base64Message,
//         };
//
//         if (!ws) {
//             throw new Error("Websocket connection is not available");
//         }
//         ws.send(JSON.stringify(payload));
//         props.setEnableMessageEditingMode(false);
//     }
//
//     return (
//         <>
//             <div className="rounded-xl bg-gray-300/90 text-black shadow-xl">
//                 <div className="px-3 pt-2">
//                     <textarea
//                         className="peer=hover/edit:animate-pulse h-20 w-full rounded-xl bg-white/90 p-2 text-black"
//                         value={message}
//                         onChange={(event) => {
//                             setMessage(event.target.value);
//                         }}
//                     />
//                 </div>
//
//                 <div className="flex justify-center gap-3 p-2 text-xs">
//                     <button
//                         type="button"
//                         onClick={onChangedMessageSubmit}
//                         onKeyDown={onChangedMessageSubmit}
//                         className="rounded-xl bg-emerald-700 p-2 px-3 text-white"
//                     >
//                         {t("save_edit_button")}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => {
//                             props.setEnableMessageEditingMode(false);
//                         }}
//                         onKeyDown={() => {
//                             props.setEnableMessageEditingMode(false);
//                         }}
//                         className="rounded-xl bg-amber-700 p-2 px-3 text-white"
//                     >
//                         {t("cancel_edit_button")}
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export { EditMessageMode };
