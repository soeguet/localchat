import { type ReactNode, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../stores/userStore";

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
                onFocus={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                onBlur={() => setHover(false)}
                className="relative flex size-full flex-col rounded-xl p-3"
            >
                <button
                    type="button"
                    className="myTransition absolute right-3 top-0 select-none text-center text-2xl hover:text-3xl hover:font-bold"
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
