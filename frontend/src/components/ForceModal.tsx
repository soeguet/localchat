import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import useClientsStore from "../stores/clientsStore";
import useWebsocketStore from "../stores/websocketStore";
import {PayloadSubType} from "../utils/customTypes";
import useUserStore from "../stores/userStore";

function ForceModal() {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const forceModalRef = useRef<HTMLDivElement>(null);

    const clientsList = useClientsStore((state) => state.clients);
    const websocket = useWebsocketStore((state) => state.ws);

    const clientId = useUserStore((state) => state.myId);

    function forceClient(clientId: string) {
        if (websocket !== null) {
            websocket.send(
                JSON.stringify({
                    payloadType: PayloadSubType.force,
                    clientId: clientId,
                })
            );
        }
    }

    /**
     * Handles the click outside of the modal.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (forceModalRef.current && !forceModalRef.current.contains(event.target as Node)) {
            const {left, top, right, bottom} = forceModalRef.current.getBoundingClientRect();
            const {clientX, clientY} = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
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
            {isOpen && <div
                className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div ref={forceModalRef}
                     className="bg-white p-4 rounded-lg text-black w-full sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2 divide-y-2 divide-gray-400 border-2 border-blue-300">
                    {
                        clientsList.map((client) => {
                            if (client.id === clientId) return
                            return (
                                <div key={client.id} className="flex justify-between items-center ">
                                    <span>{client.username}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => forceClient(client.id)}
                                    >
                                        {t("menu_item_force")}
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>}
        </>
    );
}

export default ForceModal;