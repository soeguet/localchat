import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClientStore } from "../../../stores/clientStore";
import { useWebsocketStore } from "../../../stores/websocketStore";
import { PayloadSubType } from "../../../utils/customTypes";
import { useUserStore } from "../../../stores/userStore";

function ForceModal() {
    const clientsList = useClientStore((state) => state.clients);
    if (clientsList.length === 0) {
        return null;
    }
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const forceModalRef = useRef<HTMLDialogElement>(null);
    // const thisClientColor: string = useUserStore((state) => state.myColor);
    const thisClientColor: string = "red";

    useEffect(() => {
        if (forceModalRef == null || forceModalRef.current === null) {
            return;
        }
        if (isOpen) {
            forceModalRef.current.showModal();
        } else if (forceModalRef.current.open) {
            forceModalRef.current.close();
        }
    }, [isOpen]);

    const websocket = useWebsocketStore((state) => state.ws);

    const thisClientId = useUserStore((state) => state.myId);

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
            const { left, top, right, bottom } =
                forceModalRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

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

    // TODO rewrite as dialog
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
                <dialog
                    ref={forceModalRef}
                    className={`myTransition size-2/3 rounded-lg border-2 p-4 text-black ${thisClientColor && "hover:border-" + thisClientColor + "-500"}`}
                >
                    <button
                        className="absolute right-2 top-2 size-7 rounded-xl border border-gray-500 bg-gray-300  text-xs transition ease-in-out hover:bg-gray-200"
                        onClick={() => setIsOpen(false)}
                    >
                        x
                    </button>
                    <table className="min-w-full divide-y divide-gray-500 ">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                >
                                    username
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {clientsList.map((client) => {
                                if (client.clientDbId === thisClientId) return;
                                return (
                                    <tr
                                        key={client.clientUsername}
                                        className=" group/force-name myTransition border border-transparent even:bg-gray-200 hover:border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="myTransition whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 group-hover/force-name:text-blue-400 sm:pl-3">
                                            {client.clientUsername}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                            <button
                                                className="rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                                                onClick={() =>
                                                    forceClient(
                                                        client.clientDbId
                                                    )
                                                }
                                            >
                                                {t("menu_item_force")}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </dialog>
            )}
        </>
    );
}

export { ForceModal };
