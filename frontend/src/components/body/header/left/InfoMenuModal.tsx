import { type ReactNode, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../stores/userStore";
import { ClientName } from "./ClientName";

type InfoMenuModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const InfoMenuModal = (props: InfoMenuModalProps) => {
    const [hover, setHover] = useState(false);
    const clientColor: string = useUserStore.getState().myColor;
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef == null || dialogRef.current === null) {
            return;
        }
        if (props.isOpen) {
            dialogRef.current.showModal();
        } else if (dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [props.isOpen]);

    return (
        <dialog
            data-testid="info-menu-modal"
            className="myTransition flex size-1/4 flex-col rounded-xl border-2 border-transparent shadow-lg backdrop:bg-black backdrop:bg-opacity-70"
            style={{
                borderColor: hover ? clientColor : "",
            }}
            ref={dialogRef}
            onClose={props.onClose}
        >
            <div
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                className="relative flex size-full flex-col rounded-xl p-3"
            >
                <button
                    className="absolute right-1 top-1 rounded-full border border-gray-500 bg-gray-300 px-3 pb-1 transition ease-in-out hover:bg-gray-200"
                    onClick={props.onClose}
                >
                    x
                </button>
                <div className="h-full">{props.children}</div>
            </div>
        </dialog>
    );
};

export { InfoMenuModal };
