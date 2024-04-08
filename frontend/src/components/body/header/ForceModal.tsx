import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useClientStore} from "../../../stores/clientStore";
import {useWebsocketStore} from "../../../stores/websocketStore";
import {PayloadSubType} from "../../../utils/customTypes";
import {useUserStore} from "../../../stores/userStore";

function ForceModal() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const forceModalRef = useRef<HTMLDivElement>(null);

    const clientsList = useClientStore((state) => state.clients);
    const websocket = useWebsocketStore((state) => state.ws);

    const clientDbId = useUserStore((state) => state.myId);

    function forceClient(clientDbId: string) {
        if (websocket !== null) {
            websocket.send(
                JSON.stringify({
                    payloadType: PayloadSubType.force,
                    clientDbId: clientDbId,
                })
            );
        }
    }

    /**
     * Handles the click outside of the modal.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (
            forceModalRef.current &&
            !forceModalRef.current.contains(event.target as Node)
        ) {
            const {left, top, right, bottom} =
                forceModalRef.current.getBoundingClientRect();
            const {clientX, clientY} = event;

            if (
                clientX < left ||
                clientX > right ||
                clientY < top ||
                clientY > bottom
            ) {
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    return (
        <>
            <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {t("menu_item_force")}
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        ref={forceModalRef}
                        className="w-full divide-y-2 divide-gray-400 rounded-lg border-2 border-blue-300 bg-white p-4 text-black sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2"
                    >
                        {clientsList.map((client) => {
                            if (client.clientDbId === clientDbId) return;
                            return (
                                <div
                                    key={client.clientDbId}
                                    className="flex items-center justify-between"
                                >
                                    <span>{client.clientUsername}</span>
                                    <button
                                        className="rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                                        onClick={() =>
                                            forceClient(client.clientDbId)
                                        }
                                    >
                                        {t("menu_item_force")}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export {ForceModal};