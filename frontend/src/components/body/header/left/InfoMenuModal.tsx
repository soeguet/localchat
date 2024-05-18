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
            className=" flex size-1/4 flex-col rounded-xl shadow-lg backdrop:bg-black backdrop:bg-opacity-70 hover:border-cyan-400"
            ref={dialogRef}
            onClose={props.onClose}
        >
            <div className="duration-300k relative  flex size-full flex-col rounded-xl border-2 p-3 transition ease-in-out hover:border-cyan-400 ">
                <button
                    className="absolute right-1 top-1 rounded-full border border-gray-500 bg-gray-300 px-3 pb-1 transition ease-in-out hover:bg-gray-200"
                    onClick={props.onClose}
                >
                    x
                </button>
                <div className=" h-full">{props.children}</div>
            </div>
        </dialog>
    );
};

export { InfoMenuModal };

