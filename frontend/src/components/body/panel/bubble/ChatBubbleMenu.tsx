import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleClickOutsideOfDiv } from "../../../../utils/handleClickOutsideOfDiv";
import {
    PayloadSubType,
    type MessagePayload,
} from "../../../../utils/customTypes";
import { useWebsocketStore } from "../../../../stores/websocketStore";

type ChatBubbleMenuProps = {
    messagePayload: MessagePayload;
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
    activateReplyMessage: () => void;
    setEnableMessageEditingMode: (enable: boolean) => void;
    thisMessageFromThisClient: boolean;
};

function ChatBubbleMenu(props: ChatBubbleMenuProps) {
    const { t } = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.showMenu) {
            document.addEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(menuRef, event, props.setShowMenu)
            );
        }

        return () => {
            document.removeEventListener("mousedown", (event) =>
                handleClickOutsideOfDiv(menuRef, event, props.setShowMenu)
            );
        };
    }, [props.showMenu, props.setShowMenu]);

    function deletePayloadToSocket() {
        const deletePayload = {
            payloadType: PayloadSubType.delete,
            messageDbId: props.messagePayload.messageType.messageDbId,
        };

        const ws = useWebsocketStore.getState().ws;

        if (!ws) {
            throw new Error("Websocket connection is not available");
        }
        ws.send(JSON.stringify(deletePayload));
    }

    return (
        <>
            {props.showMenu && (
                <div
                    className={`absolute ${props.thisMessageFromThisClient
                            ? "right-0 mr-20"
                            : "left-0 ml-20"
                        } z-20 mt-2 w-48 rounded-md border-2 bg-white py-1 shadow-xl`}
                    data-testid="chat-bubble-menu"
                    ref={menuRef}>
                    <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                        onClick={props.activateReplyMessage}>
                        {t("menu_item_reply")}
                    </button>
                    {props.thisMessageFromThisClient && (
                        <>
                            <button
                                type="button"
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={() =>
                                    props.setEnableMessageEditingMode(true)
                                }>
                                {t("menu_item_edit")}
                            </button>
                            <button
                                type="button"
                                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                                onClick={deletePayloadToSocket}>
                                {t("menu_item_delete")}
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export { ChatBubbleMenu };
