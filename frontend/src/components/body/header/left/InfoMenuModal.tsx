import { ReactNode, useEffect, useRef } from "react";

type InfoMenuModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const InfoMenuModal = (props: InfoMenuModalProps) => {
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
            className=" flex size-1/4 flex-col rounded-xl border border-black p-3 shadow-lg"
            ref={dialogRef}
            onClose={props.onClose}
        >
            <div className="relative flex justify-end">
                <button
                    className=" absolute rounded-full border border-gray-500 bg-gray-300 px-3 pb-1 transition ease-in-out hover:bg-gray-200"
                    onClick={props.onClose}
                >
                    x
                </button>
            </div>
            <div className="h-full">{props.children}</div>
        </dialog>
    );
};

export { InfoMenuModal };
